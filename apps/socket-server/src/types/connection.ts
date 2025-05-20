export interface UserConnection {
	userId: string;
	socketIds: Set<string>;
}
export interface FriendRequestData {
	fromUserId: string;
	toUserId: string;
}
