import { Injectable } from '@angular/core';
import { ChatSession } from '../../models/chat/chat-session';
import { CHATSESSIONS } from './mock/mock-chat-sessions';

@Injectable({
    providedIn: 'root'
})
export class ChatSessionService {
    chatSessions: ChatSession[];

    constructor() {
        this.reset();
    }

    get(userId: number) {
        return this.chatSessions.filter(chatSession => chatSession.user1Id === userId || chatSession.user2Id === userId);
    }

    getAll() {
        return this.chatSessions;
    }

    getChatSession(chatSessionId: number) {
        return this.chatSessions.find(find => find.chatSessionId === chatSessionId);
    }

    getExistingChatSession(user1Id, user2Id) {
        return this.chatSessions.find(chatSession =>
            chatSession.user1Id === user1Id && chatSession.user2Id === user2Id ||
            chatSession.user1Id === user2Id && chatSession.user2Id === user1Id);
    }

    add(chatSession: ChatSession) {
        this.chatSessions.push(chatSession);
    }

    update(newChatSession: ChatSession) {
        const update = this.chatSessions.find(chatSession => chatSession.chatSessionId === newChatSession.chatSessionId);
        update.lastMessage = newChatSession.lastMessage;
        update.lastMessageDate = newChatSession.lastMessageDate;
        update.user1 = newChatSession.user1;
        update.user1Id = newChatSession.user1Id;
        update.user2 = newChatSession.user2;
        update.user2Id = newChatSession.user2Id;
    }

    delete(chatSessionId: number) {
    }

    clear() {
        this.chatSessions = [];
    }

    reset() {
        this.chatSessions = CHATSESSIONS;
    }

    chatSessionExist(user1Id, user2Id) {
        return this.chatSessions.some(chatSession =>
            chatSession.user1Id === user1Id && chatSession.user2Id === user2Id ||
            chatSession.user1Id === user2Id && chatSession.user2Id === user1Id);
    }
}
