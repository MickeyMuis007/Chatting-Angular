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

    add(chatSession: ChatSession) {
        this.chatSessions.push(chatSession);
    }

    update(chatSessionId: number) {
    }

    delete(chatSessionId: number) {
    }

    clear() {
        this.chatSessions = [];
    }

    reset() {
        this.chatSessions = CHATSESSIONS;
    }
}
