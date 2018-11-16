import { ChatSession } from 'src/app/models/chat/chat-session';
import { USERS } from './mock-users';

export const CHATSESSIONS: ChatSession[] = [
    { chatSessionId: 1, user1Id: USERS[0].userId, user2Id: USERS[1].userId,
        user1: USERS[0], user2: USERS[1] },
    { chatSessionId: 2, user1Id: USERS[1].userId, user2Id: USERS[2].userId,
        user1: USERS[1], user2: USERS[2] },
];
