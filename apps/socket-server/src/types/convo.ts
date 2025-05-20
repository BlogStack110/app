export interface MessageData {
  senderId: string;
  receiverId: string;
  content: string;
  conversationId?: number;
}

export interface TypingData {
  conversationId: number;
  userId: string;
}

export interface ReadData {
  userId: string;
  conversationId: number;
}

// Add new interfaces for edit and delete operations
export interface EditMessageData {
  messageId: number;
  content: string;
  conversationId: number;
  userId: string;
}

export interface DeleteMessageData {
  messageId: number;
  conversationId: number;
  userId: string;
}
