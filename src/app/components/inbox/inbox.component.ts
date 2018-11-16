import { Component, OnInit } from '@angular/core';
import { ChatSessionService } from 'src/app/services/chat/chat-session.service';
import { ChatSession } from 'src/app/models/chat/chat-session';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Chat } from 'src/app/models/chat/chat';
import { User } from 'src/app/models/chat/user.model';
import { UserService } from 'src/app/services/chat/user.service';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
    title: string;
    message: string;
    chatSessions: ChatSession[];
    chats: Chat[];
    currentUser: User;
    users: User[];
    selectedUser;

    constructor(
        private chatSessionService: ChatSessionService,
        private chatService: ChatService,
        private userService: UserService) {
        this.title = 'Inbox';
    }

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.users = this.userService.get();
        this.currentUser = this.userService.getUser(1);
        this.selectedUser = this.currentUser.userId;
        this.chatSessions = this.chatSessionService.get(this.currentUser.userId);
    }

    chatSessionSelection(chatSessionId) {
        console.log('ChatSessionId: ' + chatSessionId);
        this.chats = this.chatService.getChatFromChatSession(chatSessionId);
    }

    userChanged() {
        this.clearChats();
        this.currentUser = this.userService.getUser(Number(this.selectedUser));
        this.chatSessions = this.chatSessionService.get(this.currentUser.userId);
    }

    sendMessage() {
        console.log('-> Send Message');
    }

    private clearChats() {
        this.chats = [];
    }
}
