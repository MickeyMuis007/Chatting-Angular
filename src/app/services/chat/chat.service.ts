import { Injectable } from '@angular/core';
import { Chat } from '../../models/chat/chat';
import { CHATS } from './mock/mock-chats';

import { SmsReceiveService } from '../sms/sms-receive.service';
import { ChatSessionService } from './chat-session.service';

import { Receive } from 'src/app/models/sms/receive.model';
import { User } from 'src/app/models/chat/user.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    chats: Chat[];

    constructor(
        private smsReceiveService: SmsReceiveService,
        private chatSessionService: ChatSessionService
    ) {
        this.reset();
    }

    get() {
        return this.chats;
    }

    getChatFromChatSession(chatSeasonId: number) {
        const foundChats = this.chats.filter(find => find.chatSessionId === chatSeasonId).sort((t, r) => {
            return t.chatId - r.chatId;
        });
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
        this.clear();
        this.mapToChats();
        // this.chats = CHATS;
    }

    private mapToChats() {
        this.smsReceiveService.getApi().toPromise().then((res: Receive[]) => {
            res.forEach((item) => {
                this.chats.push(this.createChat(item));
            });
        });

        // const receives = this.smsReceiveService.get();
        // receives.forEach((item) => {
        //     this.chats.push(this.createChat(item));
        // });
    }

    private createChat(receive: Receive): Chat {
        const chat: Chat = {
            chatId: receive.receivedSMSId,
            chatSessionId: this.findChatSessionId(receive.fromCell, receive.toCell),
            dateUpdated: new Date(),
            message: receive.message,
            receiver: this.createUser(receive.toCell, receive.toCell),
            receiverId: Number(receive.toCell),
            sender: this.createUser(receive.fromCell, receive.fromCell),
            senderId: Number(receive.fromCell)

        };
        return chat;
    }

    private createUser(contactNo: string, name: string): User {
        const user: User = {
            contactNo: Number(contactNo),
            name: name,
            displayName: name,
        };
        return user;
    }

    private findChatSessionId(fromCell: string, toCell: string): number {
        const chatSession = this.chatSessionService.getExistingChatSession(Number(fromCell), Number(toCell));
        return chatSession.chatSessionId;
    }
}

