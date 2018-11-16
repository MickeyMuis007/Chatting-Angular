import { Chat } from 'src/app/models/chat/chat';
import { USERS } from './mock-users';

export const CHATS: Chat[] = [
    { chatId: 1, chatSessionId: 1, senderId: USERS[0].userId, receiverId: USERS[1].userId,
        sender: USERS[0], receiver: USERS[1], message: 'Hi Adam.', dateUpdated: new Date() },

    { chatId: 2, chatSessionId: 1, senderId: USERS[0].userId, receiverId: USERS[1].userId,
        sender: USERS[0], receiver: USERS[1], message: 'Hows Things going.', dateUpdated: new Date() },

    { chatId: 3, chatSessionId: 1, senderId: USERS[1].userId, receiverId: USERS[0].userId,
        sender: USERS[1], receiver: USERS[0], message: 'Good thanks John and you?', dateUpdated: new Date() },

    { chatId: 4, chatSessionId: 2, senderId:  USERS[1].userId, receiverId: USERS[2].userId,
        sender: USERS[1], receiver: USERS[2], message: 'Yo James, where you at', dateUpdated: new Date() },
];
