/**
 * Author: Michael Alan Hendricks
 * Date Created: 15/11/2018
 * Description: Handles all events and controls for inbox. Which is used for receiving messages.
 */

/* Angular Import */
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

/* Service Import */
import { ChatSessionService } from 'src/app/services/chat/chat-session.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/chat/user.service';
import { SmsService } from 'src/app/services/sms/sms.service';

/* Models Import */
import { ChatSession } from 'src/app/models/chat/chat-session';
import { Chat } from 'src/app/models/chat/chat';
import { User } from 'src/app/models/chat/user.model';
import { Receive } from 'src/app/models/sms/receive.model';
import { Send } from 'src/app/models/sms/send.model';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked {
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

    @ViewChild('msgHistory') private myScrollContainer: ElementRef;

    //#endregion properties

    /**************
     * Constructor
     **************/
    //#region constructor

    constructor(
        private chatSessionService: ChatSessionService,
        private chatService: ChatService,
        private smsService: SmsService,
        private userService: UserService) {
        this.title = 'Inbox';
    }

    //#endregion constructor

    /*********
     * Events
     *********/
    //#region events

    ngOnInit() {
        console.log('\nevent: ngOnInit()');
        this.reset();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    chatSessionSelection(chatSession: ChatSession) {
        console.log('\nevent: chatSessionSelection()');

        this.chats = this.chatService.getChatFromChatSession(chatSession.chatSessionId);
        this.selectedChatSession = chatSession;
        this.selectedChatSessionId = chatSession.chatSessionId;

        this.markAsRead();              // first need to get selected chatSession before marking as read
        this.setMessengerName();
        this.showMessageInput();
    }

    userChanged() {
        console.log('\nevent: userChanged()');


        this.chatSessionService.getReceiveTest().toPromise()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
        console.log(this.chatSessionService.getAll());
        console.log(this.userService.get());
        console.log(this.chatService.get());

        this.clearChats();
        this.currentUser = this.userService.getUser(Number(this.selectedUser));
        this.chatSessions = this.chatSessionService.get(this.currentUser.contactNo);
    }

    sendMessage() {
        console.log('\nevent: sendMessage()');

        if (this.message) {
            this.updateChatSession();
            const chat = this.createChat();
            this.chatService.add(chat);
            this.chats = this.chatService.getChatFromChatSession(this.selectedChatSession.chatSessionId);
            this.markReceiverAsUnread();   // Mark message receiver as unread
            this.sendSms(this.createSendModel(chat));
            this.message = '';
        }
    }

    // Find current users read status
    checkRead(chatSession: ChatSession) {
        let read = false;
        if (this.currentUser.contactNo === chatSession.user1Id) {
            read = chatSession.user1Read;
        } else {
            read = chatSession.user2Read;
        }
        return read;
    }

    private createSendModel (chat: Chat): Send {
        const send: Send = {
            mTSMSId: -1,
            appId: -1,
            refId: -1,
            from: chat.senderId.toString(),
            to: chat.receiverId.toString(),
            text: chat.message,
            sent: false,
            password: '',
            username: ''
        };
        return send;
    }

    private sendSms(send: Send) {
        this.smsService.sendSms(send).toPromise();
    }

    //#endregion events

    /**********
     * Methods
     **********/
    //#region methods


    reset() {
        console.log('method: reset()');

        this.users = this.userService.get();

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
        console.log('Sender Id(Current User):' + this.currentUser.contactNo + ' - ' + this.currentUser.name);
        console.log('Receiver Id:' + (this.selectedChatSession.user1Id === this.currentUser.contactNo
            ? (this.selectedChatSession.user2Id + ' - ' + this.selectedChatSession.user2.name)
            : (this.selectedChatSession.user1Id + ' - ' + this.selectedChatSession.user1.name)));

        const chat: Chat = {
            chatId: (this.chatService.get().length + 2),
            chatSessionId: this.selectedChatSession.chatSessionId,
            senderId: this.currentUser.contactNo,
            sender: this.currentUser,
            receiverId: (this.selectedChatSession.user1Id === this.currentUser.contactNo ?
                this.selectedChatSession.user2Id : this.selectedChatSession.user1Id),
            receiver: (this.selectedChatSession.user1Id === this.currentUser.contactNo ?
                this.selectedChatSession.user2 : this.selectedChatSession.user1),
            dateUpdated: new Date(),
            message: this.message
        };

        return chat;
    }

    private setMessengerName() {
        this.messengerName = (this.selectedChatSession.user1Id === this.currentUser.contactNo
            ? this.selectedChatSession.user2.name
            : this.selectedChatSession.user1.name);
    }

    private updateChatSession() {
        this.selectedChatSession.lastMessage = this.message;
        this.selectedChatSession.lastMessageDate = new Date().toDateString();
        this.chatSessionService.update(this.selectedChatSession);
    }

    private updateSelectedChatSession() {
        this.chatSessionService.update(this.selectedChatSession);
    }

    private markAsRead() {
        if (this.selectedChatSession.user1Id === this.currentUser.contactNo) {
            this.selectedChatSession.user1Read = true;
        } else {
            this.selectedChatSession.user2Read = true;
        }
        this.updateSelectedChatSession();
    }

    private markReceiverAsUnread() {
        if (this.selectedChatSession.user1Id === this.currentUser.contactNo) {
            this.selectedChatSession.user2Read = false;
        } else {
            this.selectedChatSession.user1Read = false;
        }
    }

    //#endregion methods

}
