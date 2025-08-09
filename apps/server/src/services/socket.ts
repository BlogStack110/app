import { Server } from "socket.io";
import Redis from "ioredis";
import dotenv from "dotenv";
import { prisma } from "../db";
import {
  DeleteMessageData,
  EditMessageData,
  MessageData,
  ReadData,
  TypingData,
} from "../types/convo";
import { FriendRequestData } from "../types/connection";
import { getRedisConfig } from "../lib/url";

// Load environment variables
dotenv.config();
//define redis config
const redisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "21348"),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
  tls: {},
};

interface RoomMessage {
  roomName: string;
  message: string;
  sender: string;
  timestamp: Date;
}

// Store user connections with Map for better performance
const userConnections = new Map<string, Set<string>>();

/**
 * Get all socket IDs for a specific user
 */
const getUserSocketIds = (userId: string): string[] => {
  return Array.from(userConnections.get(userId) || []);
};

/**
 * Add a socket connection to a user's session
 */
const addUserSocket = (userId: string, socketId: string): void => {
  if (!userConnections.has(userId)) {
    userConnections.set(userId, new Set());
  }
  userConnections.get(userId)?.add(socketId);
  console.log(`User ${userId} connected with socket ${socketId}`);
  console.log(
    `User ${userId} has ${userConnections.get(userId)?.size} active connections`,
  );
};

/**
 * Remove a socket connection from a user's session
 * @returns boolean indicating if this was the user's last connection
 */
const removeUserSocket = (socketId: string, userId: string): boolean => {
  const sockets = userConnections.get(userId);
  if (!sockets) return true;

  sockets.delete(socketId);
  if (sockets.size === 0) {
    userConnections.delete(userId);
    return true; // Last connection removed
  }
  return false; // User still has other connections
};

/**
 * Find or create a conversation between two users
 */
async function findOrCreateConversation(userId1: string, userId2: string) {
  try {
    // Try to find existing conversation
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { identifier: userId1 } } },
          { users: { some: { identifier: userId2 } } },
        ],
      },
    });

    if (existingConversation) {
      return { conversation: existingConversation, isNew: false };
    }

    // Verify both users exist
    const [user1, user2] = await Promise.all([
      prisma.user.findUnique({ where: { identifier: userId1 } }),
      prisma.user.findUnique({ where: { identifier: userId2 } }),
    ]);

    if (!user1 || !user2) {
      throw new Error(`One or both users not found: ${userId1}, ${userId2}`);
    }

    // Create new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ identifier: userId1 }, { identifier: userId2 }],
        },
      },
    });

    return { conversation: newConversation, isNew: true };
  } catch (error) {
    console.error("Error in findOrCreateConversation:", error);
    throw error;
  }
}

//The main class for socket services
class SocketService {
  private _io: Server;
  private _pub: Redis;
  private _sub: Redis;
  private _activeRooms: Map<string, Set<string>>;

  constructor() {
    console.log("Starting socket service...");

    this._io = new Server({
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.ALLOWED_ORIGIN
            : "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    this._pub = new Redis(redisOptions);
    this._sub = new Redis(redisOptions);
    this._activeRooms = new Map();

    // Error handlers
    this._pub.on("error", (err) => console.error("Redis Pub Error:", err));
    this._sub.on("error", (err) => console.error("Redis Sub Error:", err));

    // Subscribe to general messages channel
    this._sub.subscribe("MESSAGES");
  }

  public getIo() {
    return this._io;
  }

  private handleRoomMessage(channel: string, message: string) {
    const roomName = channel.split(":")[1];

    this._io.to(roomName).emit("roomMessage", message);
  }
  //initializing the listeners
  public initListeners() {
    console.log("Initializing socket listeners...");

    this._io.on("connection", (socket) => {
      console.log("New connection:", socket.id);
      socket.on("message", async (message: string) => {
        console.log("message recieved : " + message);
        this._pub.publish("MESSAGES", JSON.stringify({ message }));
      });
      let currentUserId: string | null = null;

      socket.on("user_connected", async (userId: string) => {
        try {
          if (!userId) {
            socket.emit("error", { message: "Invalid user ID" });
            return;
          }

          currentUserId = userId;
          addUserSocket(userId, socket.id);

          // Notify other users about online status
          socket.broadcast.emit("user_status", { userId, status: "online" });

          // Join conversation rooms
          await joinUserConversations(socket, userId);
        } catch (error) {
          console.error(`Error in user_connected handler:`, error);
          socket.emit("error", { message: "Failed to initialize connection" });
        }
      });

      // Handle typing indicator
      socket.on("typing", (data: TypingData) => {
        try {
          const { conversationId, userId } = data;
          const roomName = `conversation:${conversationId}`;

          // Emit typing event to the conversation room
          socket.to(roomName).emit("user_typing", { conversationId, userId });
        } catch (error) {
          console.error("Error handling typing event:", error);
        }
      });

      // Handle read message status update
      socket.on("mark_as_read", async (data: ReadData) => {
        try {
          const { userId, conversationId } = data;

          // Mark messages as read
          await prisma.message.updateMany({
            where: {
              conversationId,
              receiverId: userId,
              read: false,
            },
            data: {
              read: true,
            },
          });

          // Broadcast read status to conversation room
          const roomName = `conversation:${conversationId}`;
          socket.to(roomName).emit("messages_read", { userId, conversationId });
        } catch (error) {
          console.error("Error marking messages as read:", error);
          socket.emit("error", { message: "Failed to update read status" });
        }
      });

      // Handle joining a specific conversation
      socket.on("join_conversation", (conversationId: number) => {
        try {
          const roomName = `conversation:${conversationId}`;
          socket.join(roomName);
          console.log(`Socket ${socket.id} joined room ${roomName}`);
        } catch (error) {
          console.error("Error joining conversation:", error);
          socket.emit("error", { message: "Failed to join conversation" });
        }
      });

      // Handle message editing
      socket.on("edit_message", async (data: EditMessageData) => {
        try {
          const { messageId, content, conversationId, userId } = data;

          // Verify the message exists and belongs to the user
          const message = await prisma.message.findFirst({
            where: {
              id: messageId,
              senderId: userId,
              conversationId,
            },
          });

          if (!message) {
            console.error(
              `Message ${messageId} not found or not owned by user ${userId}`,
            );
            socket.emit("error", { message: "Cannot edit this message" });
            return;
          }

          // Update the message content
          await prisma.message.update({
            where: { id: messageId },
            data: { content },
          });

          console.log(`Message ${messageId} edited by user ${userId}`);

          // Broadcast the edit to all users in the conversation
          const roomName = `conversation:${conversationId}`;
          this._io.to(roomName).emit("message_edited", {
            messageId,
            content,
            conversationId,
            userId,
          });
        } catch (error) {
          console.error("Error editing message:", error);
          socket.emit("error", { message: "Failed to edit message" });
        }
      });

      // Handle message deletion
      socket.on("delete_message", async (data: DeleteMessageData) => {
        try {
          const { messageId, conversationId, userId } = data;

          // Verify the message exists and belongs to the user
          const message = await prisma.message.findFirst({
            where: {
              id: messageId,
              senderId: userId,
              conversationId,
            },
          });

          if (!message) {
            console.error(
              `Message ${messageId} not found or not owned by user ${userId}`,
            );
            socket.emit("error", { message: "Cannot delete this message" });
            return;
          }

          // Delete the message
          await prisma.message.delete({
            where: { id: messageId },
          });

          console.log(`Message ${messageId} deleted by user ${userId}`);

          // Broadcast the deletion to all users in the conversation
          const roomName = `conversation:${conversationId}`;
          this._io.to(roomName).emit("message_deleted", {
            messageId,
            conversationId,
            userId,
          });
        } catch (error) {
          console.error("Error deleting message:", error);
          socket.emit("error", { message: "Failed to delete message" });
        }
      });
      // Handle friend requests
      socket.on("send_friend_request", async (data: FriendRequestData) => {
        try {
          const { fromUserId, toUserId } = data;

          // Check if users exist
          const [sender, receiver] = await Promise.all([
            prisma.user.findUnique({ where: { identifier: fromUserId } }),
            prisma.user.findUnique({ where: { identifier: toUserId } }),
          ]);

          if (!sender || !receiver) {
            socket.emit("error", { message: "One or both users not found" });
            return;
          }

          // Check if friend request already exists
          const existingRequest = await prisma.friendRequest.findFirst({
            where: {
              OR: [
                { senderId: fromUserId, receiverId: toUserId },
                { senderId: toUserId, receiverId: fromUserId },
              ],
            },
          });

          if (existingRequest) {
            socket.emit("error", { message: "Friend request already exists" });
            return;
          }

          // Create friend request
          const friendRequest = await prisma.friendRequest.create({
            data: {
              senderId: fromUserId,
              receiverId: toUserId,
              status: "PENDING",
            },
          });

          // Notify the receiver
          const receiverSockets = getUserSocketIds(toUserId);
          receiverSockets.forEach((socketId) => {
            this._io.to(socketId).emit("friend_request_received", {
              requestId: friendRequest.id,
              fromUserId,
              fromUserName: sender.name,
            });
          });

          // Confirm to sender
          socket.emit("friend_request_sent", {
            requestId: friendRequest.id,
            toUserId,
            status: "PENDING",
          });
        } catch (error) {
          console.error("Error handling friend request:", error);
          socket.emit("error", { message: "Failed to send friend request" });
        }
      });

      // Handle private message
      socket.on(
        "private_message",
        async (data: MessageData, callback: (response: any) => void) => {
          try {
            const { senderId, receiverId, content, conversationId } = data;
            if (!senderId || !receiverId || !content) {
              const response = {
                status: "error",
                message: "Invalid message data",
              };
              if (typeof callback === "function") callback(response);
              return;
            }

            console.log(
              `Handling message from ${senderId} to ${receiverId}: ${content.substring(
                0,
                20,
              )}${content.length > 20 ? "..." : ""}`,
            );

            // Find or create conversation
            let targetConversation;
            let isNewConversation = false;

            if (!conversationId) {
              const result = await findOrCreateConversation(
                senderId,
                receiverId,
              );
              targetConversation = result.conversation;
              isNewConversation = result.isNew;
            } else {
              targetConversation = { id: conversationId };
            }

            // Join conversation room if new
            if (isNewConversation) {
              await handleNewConversationRoom(
                socket,
                targetConversation.id,
                senderId,
                receiverId,
                this._io,
              );
            }

            // Save message to database
            const message = await prisma.message.create({
              data: {
                content,
                senderId,
                receiverId,
                conversationId: targetConversation.id,
              },
              include: {
                sender: {
                  select: {
                    name: true,
                    pfpUrl: true,
                  },
                },
              },
            });

            console.log(`Created message in DB with ID: ${message.id}`);

            // Update conversation's timestamp
            await prisma.conversation.update({
              where: { id: targetConversation.id },
              data: { updatedAt: new Date() },
            });

            // Prepare message for broadcast
            const messageToSend = {
              ...message,
              conversationId: targetConversation.id,
            };

            // Broadcast to conversation room

            const roomName = `conversation:${targetConversation.id}`;
            this._io.to(roomName).emit("message_received", messageToSend);
            console.log(`Broadcasted message to room ${roomName}`);
            // Return success response
            if (typeof callback === "function") {
              callback({
                status: "success",
                messageId: message.id,
                conversationId: targetConversation.id,
              });
            }
          } catch (error) {
            console.error("Error sending private message:", error);
            socket.emit("error", { message: "Failed to send message" });

            if (typeof callback === "function") {
              callback({ status: "error", message: "Failed to send message" });
            }
          }
        },
      );

      // Handle joining rooms
      socket.on("joinRoom", async (roomName: string) => {
        try {
          // Leave previous rooms if any
          socket.rooms.forEach((room) => {
            if (room !== socket.id) {
              socket.leave(room);
              this._sub.unsubscribe(`ROOM:${room}`);
            }
          });

          // Join new room
          socket.join(roomName);
          socket.on("userJoined", ({ userId, timeStamp, room_name }) => {
            console.log(
              "room " +
              room_name +
              " says : user " +
              userId +
              " joined in on " +
              timeStamp +
              "!",
            );
          });
          console.log("client " + socket.id + " joined the room " + roomName);

          this._sub.subscribe(`ROOM:${roomName}`);

          // Track active users in room
          if (!this._activeRooms.has(roomName)) {
            this._activeRooms.set(roomName, new Set());
          }
          this._activeRooms.get(roomName)?.add(socket.id);

          // Notify room of new user
          this._io.to(roomName).emit("userJoined", {
            userId: socket.id,
            timestamp: Date.now(),
            room_name: roomName,
          });
        } catch (error) {
          console.error(`Error joining room ${roomName}:`, error);
          socket.emit("error", "Failed to join room");
        }
      });

      // Handle room messages
      socket.on("roomMessage", async (data: RoomMessage) => {
        try {
          const { roomName, message } = data;
          console.log("room message recieved : " + message);

          if (!socket.rooms.has(roomName)) {
            socket.emit("error", "You must join the room first");
            return;
          }

          const messageData = {
            message,
            sender: socket.id,
            timestamp: Date.now(),
          };

          await this._pub.publish(
            `ROOM:${roomName}`,
            JSON.stringify(messageData),
          );
        } catch (error) {
          console.error("Error sending room message:", error);
          socket.emit("error", "Failed to send message");
        }
      });

      // Handle leaving rooms
      socket.on("leaveRoom", (roomName: string) => {
        socket.leave(roomName);
        this._sub.unsubscribe(`ROOM:${roomName}`);
        this._activeRooms.get(roomName)?.delete(socket.id);

        this._io.to(roomName).emit("userLeft", {
          userId: socket.id,
          timestamp: Date.now(),
        });
        console.log(`user ${socket.id} left the room ${roomName}`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        try {
          if (currentUserId) {
            const isLastConnection = removeUserSocket(socket.id, currentUserId);

            if (isLastConnection) {
              // Only broadcast offline status if this was the last connection
              socket.broadcast.emit("user_status", {
                userId: currentUserId,
                status: "offline",
              });
              console.log(
                `User ${currentUserId} went offline (all connections closed)`,
              );
            } else {
              console.log(
                `User ${currentUserId} still has other active connections`,
              );
            }
          }
        } catch (error) {
          console.error("Error handling disconnect:", error);
        }
      });
    });

    // Handle Redis messages
    this._sub.on("message", (channel: string, message: string) => {
      if (channel === "MESSAGES") {
        this._io.emit("message", message);
        console.log("Message sent to all servers!");
      } else if (channel.startsWith("ROOM:")) {
        this.handleRoomMessage(channel, message);
      }
    });
  }
}

async function joinUserConversations(socket: any, userId: string) {
  try {
    const userConversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            identifier: userId,
          },
        },
      },
      select: { id: true },
    });

    // Join all conversation rooms
    userConversations.forEach((conversation) => {
      const roomName = `conversation:${conversation.id}`;
      socket.join(roomName);
    });

    console.log(
      `User ${userId} joined ${userConversations.length} conversation rooms`,
    );
    return userConversations.length;
  } catch (error) {
    console.error(`Error joining user conversations:`, error);
    throw error;
  }
}

/**
 * Handle joining a new conversation room
 */
async function handleNewConversationRoom(
  socket: any,
  conversationId: number,
  senderId: string,
  receiverId: string,
  io: any,
) {
  try {
    const roomName = `conversation:${conversationId}`;

    // Join sender socket
    socket.join(roomName);
    console.log(
      `Sender socket ${socket.id} joined new conversation room ${roomName}`,
    );

    // Join receiver's sockets if they're online
    getUserSocketIds(receiverId).forEach((receiverSocketId) => {
      const receiverSocket = io?.sockets.sockets.get(receiverSocketId);
      if (receiverSocket) {
        receiverSocket.join(roomName);
        console.log(
          `Receiver socket ${receiverSocketId} joined new conversation room ${roomName}`,
        );
      }
    });

    // Notify receiver about new conversation
    getUserSocketIds(receiverId).forEach((receiverSocketId) => {
      io?.to(receiverSocketId).emit("new_conversation", {
        conversationId,
        withUserId: senderId,
      });
    });
  } catch (error) {
    console.error(`Error handling new conversation room:`, error);
    throw error;
  }
}

export default SocketService;
