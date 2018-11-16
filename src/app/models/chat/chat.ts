import { User } from './user.model';

export class Chat {
    chatId: number;
    chatSessionId: number;
    senderId: number;
    receiverId: number;
    sender: User;
    receiver: User;
    message: string;
    dateUpdated: Date;
}
