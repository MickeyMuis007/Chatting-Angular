import { ChatSession } from 'src/app/models/chat/chat-session';
import { USERS } from './mock-users';

export const CHATSESSIONS: ChatSession[] = [
    { chatSessionId: 1, user1Id: USERS[0].contactNo, user2Id: USERS[1].contactNo,
        user1: USERS[0], user2: USERS[1], lastMessageDate: new Date('16 Nov 2018').toDateString(),
        lastMessage: 'Good thanks John and you?', user1Read: false, user2Read: false },
    { chatSessionId: 2, user1Id: USERS[1].contactNo, user2Id: USERS[2].contactNo,
        user1: USERS[1], user2: USERS[2], lastMessageDate: new Date('16 Nov 2018').toDateString(),
        lastMessage: 'Yo James, where you at', user1Read: false, user2Read: false },
];
