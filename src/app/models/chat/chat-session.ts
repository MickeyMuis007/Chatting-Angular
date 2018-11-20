import { User } from './user.model';

export class ChatSession {
    chatSessionId: number;
    user1Id: number;
    user2Id: number;
    user1: User;
    user2: User;
    lastMessageDate?: string;
    lastMessage?: string;
    user1Read: boolean;
    user2Read: boolean;
}
