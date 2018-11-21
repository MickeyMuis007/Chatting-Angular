import { Injectable } from '@angular/core';
import { CHATSESSIONS } from './mock/mock-chat-sessions';

import { SmsReceiveService } from '../sms/sms-receive.service';
import { DateConvertor } from '../functions/date-convertor';

import { ChatSession } from '../../models/chat/chat-session';
import { User } from 'src/app/models/chat/user.model';
import { Receive } from 'src/app/models/chat/receive.model';

@Injectable({
    providedIn: 'root'
})
export class ChatSessionService {
    chatSessions: ChatSession[];

    constructor(
        private smsReceiverService: SmsReceiveService,
        private dateConvertor: DateConvertor
    ) {
        this.reset();
    }

    getReceiveTest() {
        return this.smsReceiverService.getApi();
    }

    get(contactNo: number) {
        return this.chatSessions.filter(chatSession => chatSession.user1Id === contactNo || chatSession.user2Id === contactNo);
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
        this.clear();
        this.mapToChatSession();
        //        this.chatSessions = CHATSESSIONS;
    }

    chatSessionExist(user1Id, user2Id) {
        return this.chatSessions.some(chatSession =>
            chatSession.user1Id === user1Id && chatSession.user2Id === user2Id ||
            chatSession.user1Id === user2Id && chatSession.user2Id === user1Id);
    }

    private mapToChatSession() {
        this.smsReceiverService.getApi().toPromise().then((res: Receive[]) => {
            let count = 0;
            res.forEach((item) => {
                if (!this.checkChatSessionExist(Number(item.fromCell), Number(item.toCell))) {
                    this.chatSessions.push(this.createChatSession(item, ++count));
                }
            });
        });

        // const receives = this.smsReceiverService.get();
        // let count = 0;
        // receives.forEach((item) => {
        //     if (!this.checkChatSessionExist(Number(item.fromCell), Number(item.toCell))) {
        //         this.chatSessions.push(this.createChatSession(item, ++count));
        //     }
        // });
    }

    private createUser(contactNo: string, name: string): User {
        return {
            contactNo: Number(contactNo),
            name: name,
            displayName: name
        };
    }

    private createChatSession(receive: Receive, chatSessionId) {
        const chatSession: ChatSession = {
            chatSessionId: chatSessionId,
            user1: this.createUser(receive.fromCell, receive.fromCell),
            user1Id: Number(receive.fromCell),
            user2: this.createUser(receive.toCell, receive.fromCell),
            user2Id: Number(receive.toCell),
            user1Read: false,
            user2Read: false,
            lastMessage: receive.message,
            lastMessageDate: this.dateConvertor.convertDateReceiver(receive.dateReceiver).toDateString()
        };
        return chatSession;
    }

    private checkChatSessionExist(user1Id, user2Id) {
        return this.chatSessions.some(chatSession =>
            chatSession.user1Id === user1Id && chatSession.user2Id === user2Id ||
            chatSession.user1Id === user2Id && chatSession.user2Id === user1Id);
    }
}
