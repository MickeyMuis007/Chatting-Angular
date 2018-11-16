import { Injectable } from '@angular/core';
import { Chat } from '../../models/chat/chat';
import { CHATS } from './mock/mock-chats';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    chats: Chat[];

    constructor() {
        this.reset();
    }

    get() {
        return this.chats;
    }

    getChatFromChatSession(chatSeasonId: number) {
        const foundChats = this.chats.filter(find => find.chatSessionId === chatSeasonId);
        return foundChats;
    }

    add(chat: Chat) {
        this.chats.push(chat);
    }

    update(chatId: number) {

    }

    delete(chatId: number) {

    }

    clear() {
        this.chats = [];
    }

    reset() {
        this.chats = CHATS;
    }
}
