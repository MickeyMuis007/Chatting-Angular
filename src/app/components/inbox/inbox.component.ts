/**
 * Author: Michael Alan Hendricks
 * Date Created: 15/11/2018
 * Description: Handles all events and controls for inbox. Which is used for receiving messages.
 */

/* Angular Import */
import { Component, OnInit } from '@angular/core';

/* Service Import */
import { ChatSessionService } from 'src/app/services/chat/chat-session.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/chat/user.service';

/* Models Import */
import { ChatSession } from 'src/app/models/chat/chat-session';
import { Chat } from 'src/app/models/chat/chat';
import { User } from 'src/app/models/chat/user.model';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

    constructor(
        private chatSessionService: ChatSessionService,
        private chatService: ChatService,
        private userService: UserService) {
        this.title = 'Inbox';
    }

    /*************
     * Properties
     *************/
    //#region properties

    // TODO: Create models for prorpeties
    title: string;
    message: string;
    chatSessions: ChatSession[];
    chats: Chat[];
    currentUser: User;
    users: User[];
    selectedUser: any;
    hideModel: any;
    selectedChatSession: ChatSession;
    selectedChatSessionId: number;
    messengerName: string;

    //#endregion properties

    /*********
     * Events
     *********/
    //#region events

    ngOnInit() {
        console.log('\nevent: ngOnInit()');
        this.reset();
    }

    chatSessionSelection(chatSession: ChatSession) {
        console.log('\nevent: chatSessionSelection()');

        this.chats = this.chatService.getChatFromChatSession(chatSession.chatSessionId);
        this.selectedChatSession = chatSession;
        this.selectedChatSessionId = chatSession.chatSessionId;
        this.setMessengerName();
        this.showMessageInput();
    }

    userChanged() {
        console.log('\nevent: userChanged()');
        this.clearChats();
        this.currentUser = this.userService.getUser(Number(this.selectedUser));
        this.chatSessions = this.chatSessionService.get(this.currentUser.userId);
    }

    sendMessage() {
        console.log('\nevent: sendMessage()');

        if (this.message) {
            const chat = this.createChat();
            this.chatService.add(chat);
            this.chats = this.chatService.getChatFromChatSession(this.selectedChatSession.chatSessionId);
            this.message = '';
        }
    }

    //#endregion events

    /**********
     * Methods
     **********/
    //#region methods


    reset() {
        console.log('method: reset()');

        this.users = this.userService.get();
        this.currentUser = this.userService.getUser(1);
        this.selectedUser = this.currentUser.userId;
        this.chatSessions = this.chatSessionService.get(this.currentUser.userId);

        this.createHideModel();
    }

    private clearChats() {
        console.log('method: clearChats');

        this.hideMessageInput();
        this.chats = [];
        this.selectedChatSession = null;
        this.messengerName = '';
        this.selectedChatSessionId = -1;
    }

    private createHideModel() {
        console.log('method: createHideModel()');

        this.hideModel = {
            message: true
        };
    }

    private hideMessageInput() {
        console.log('method: hideMessageInput()');

        this.message = '';
        this.hideModel.message = true;
    }

    private showMessageInput() {
        console.log('method: showMessageInput()');

        this.hideModel.message = false;
    }

    private createChat(): Chat {
        // Displaying info required to save chat
        console.log('Chat Session Id:  ' + this.selectedChatSession.chatSessionId);
        console.log('Message: ' + this.message);
        console.log('Sender Id(Current User):' + this.currentUser.userId + ' - ' + this.currentUser.name);
        console.log('Receiver Id:' + (this.selectedChatSession.user1Id === this.currentUser.userId
            ? (this.selectedChatSession.user2Id + ' - ' + this.selectedChatSession.user2.name)
            : (this.selectedChatSession.user1Id + ' - ' + this.selectedChatSession.user1.name)));

        const chat: Chat = {
            chatId: (this.chatService.get().length + 2),
            chatSessionId: this.selectedChatSession.chatSessionId,
            senderId: this.currentUser.userId,
            sender: this.currentUser,
            receiverId: (this.selectedChatSession.user1Id === this.currentUser.userId ?
                this.selectedChatSession.user2Id : this.selectedChatSession.user1Id),
            receiver: (this.selectedChatSession.user1Id === this.currentUser.userId ?
                this.selectedChatSession.user2 : this.selectedChatSession.user1),
            dateUpdated: new Date(),
            message: this.message
        };

        return chat;
    }

    private setMessengerName() {
        this.messengerName = (this.selectedChatSession.user1Id === this.currentUser.userId
            ? this.selectedChatSession.user2.name
            : this.selectedChatSession.user1.name);
    }

    //#endregion methods

}
