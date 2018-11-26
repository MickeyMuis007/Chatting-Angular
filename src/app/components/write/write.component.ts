/* Angular imports */
import { Component, OnInit } from '@angular/core';


/* Import Models */
import { User } from 'src/app/models/chat/user.model';
import { Chat } from 'src/app/models/chat/chat';
import { ChatSession } from 'src/app/models/chat/chat-session';
import { Send } from 'src/app/models/sms/send.model';

/* Import Services */
import { UserService } from 'src/app/services/chat/user.service';
import { ChatSessionService } from 'src/app/services/chat/chat-session.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ToastrService } from 'ngx-toastr';
import { SmsService } from 'src/app/services/sms/sms.service';


@Component({
    selector: 'app-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
    /*************
     * Properties
     *************/
    //#region properties

    // TODO: Create models for prorpeties
    title: string;
    users: User[];
    senderId: any;
    sender: User;
    currentUserId: any;
    currentUser: User;
    disableModel: any;                  // Disable model will be used for all disabling of components.
    message: string;
    cellNo: string;
    fromCell: string;
    chatSession: ChatSession;

    //#endregion properties

    /**************
     * Constructor
     **************/
    //#region constructor

    constructor(
        private userService: UserService,
        private chatSessionService: ChatSessionService,
        private chatService: ChatService,
        private toastr: ToastrService,
        private smsService: SmsService
    ) {
        this.title = 'Write';
    }

    //#endregion constructor

    /*********
     * Events
     *********/
    //#region events

    ngOnInit() {
        console.log('\nevent: ngOnInit()');

        this.users = this.userService.get();
        this.currentUserId = 1;
        this.currentUser = this.userService.getUser(this.currentUserId);

        // Create disable model that will be used for all disabling components. Set all disabling to default state.
        this.createDisableModel();

        // Set all controls to default state
        this.setDefaultState();
    }

    selectedUserChanged() {
        console.log('\nevent: selectedUserChanged() -> Selected User Changed');

        this.fromCell = '';
        this.currentUser = this.userService.getUser(Number(this.currentUserId));
        this.chatSessionExist();
        this.validateSendButton();
    }

    senderChanged() {
        console.log('\nevent: senderChanged() -> Sender Changed');

        this.cellNo = '';
        this.sender = this.userService.getUser(Number(this.senderId));
        this.chatSessionExist();
        this.validateSendButton();
    }

    cellNoKeyUp() {
        console.log('\nevent: cellNoKeyUp()');

        this.senderId = -1;
        this.sender = this.createSenderFromCellNo();
        this.validateSendButton();
    }

    fromCellKeyUp() {
        console.log('\nevent: fromCellKeyUp()');

        this.currentUserId = -1;
        if (this.validateFromCellNo()) {
            this.currentUser = this.createCurrentUserFromFromCellNo();
            this.validateSendButton();
        }
    }

    messageKeyDown() {
        console.log('\nevent: messageKeyDown()');

        this.validateSendButton();
    }

    send() {
        console.log('\nevent: send() -> Sending Message');

        if (this.message) {
            console.log('Send messages.....');
            const chat: Chat = null;

            if (this.chatSessionExist()) {
                this.getChatSession();                      // If chat session exist. Then first get chat session before one can be created
                this.chatService.add(this.createChat());    // Create and add chat and add to list. Requires chatSession
                this.toastr.success('Message was succesfully send to ' + this.sender.name, 'Send');
            } else {
                this.chatSessionService.add(this.createChatSession());
                this.getChatSession();
                this.chatService.add(this.createChat());
                this.toastr.success('Message was succesfully send to ' + this.sender.name, 'Send');
            }

            this.sendSms(this.createSendModel(this.createChat()));
            this.addSender();               // Add sender if it's created from cell no
            this.updateChatSession();
            this.setDefaultState();
        }
    }

    //#endregion events

    /**********
     * Methods
     **********/
    //#region method

    private createDisableModel() {
        console.log('createDisableModel()');

        this.disableModel = {
            sendButton: true
        };
    }

    private disableSendButton() {
        console.log('method: disableSendButton()');
        this.disableModel.sendButton = true;
    }

    private enableSendButton() {
        console.log('method: enableSendButton()');

        this.disableModel.sendButton = false;
    }

    private validateSendButton() {
        console.log('method: validateSendButton()');

        if ((Number(this.senderId) !== -1 || (this.validateCellNo() && this.cellNo)) &&
            (Number(this.currentUserId) !== -1 || (this.validateFromCellNo() && this.fromCell)) &&
            (this.currentUser ? this.currentUser.contactNo : -1) !== Number(this.senderId) &&
            (this.currentUser ? this.currentUser.contactNo : -1) !== Number(this.cellNo) &&
            this.message && this.currentUser) {
            this.enableSendButton();
        } else {
            this.disableSendButton();
        }
    }

    private setDefaultState() {
        console.log('method: setDefaultState()');

        this.message = '';
        this.cellNo = '';
        this.senderId = -1;
        this.sender = null;

        // Create disable model that will be used for all disabling components. Set all disabling to default state.
        this.disableSendButton();
    }

    private chatSessionExist() {
        console.log('method: chatSessionExist()');
        const senderId = !this.sender ? -1 : this.sender.contactNo;
        console.log('Chat Session Exist: ' +
            this.chatSessionService.chatSessionExist(Number((this.currentUser ? this.currentUser.contactNo : -1)), Number(senderId)));

        return this.chatSessionService.chatSessionExist(Number((this.currentUser ? this.currentUser.contactNo : -1)), Number(senderId));
    }

    private getChatSession() {
        console.log('method: getChatSesison()');

        this.chatSession = this.chatSessionService
        .getExistingChatSession(Number(this.currentUser.contactNo), Number(this.sender.contactNo));
    }

    private createChat(): Chat {
        console.log('method: createChat()');

        const chat: Chat = {
            chatId: (this.chatService.get().length + 2),
            chatSessionId: this.chatSession.chatSessionId,
            senderId: this.currentUser.contactNo,
            sender: this.currentUser,
            receiverId: (this.chatSession.user1Id === this.currentUser.contactNo ? this.chatSession.user2Id : this.chatSession.user1Id),
            receiver: (this.chatSession.user1Id === this.currentUser.contactNo ? this.chatSession.user2 : this.chatSession.user1),
            dateUpdated: new Date(),
            message: this.message
        };
        return chat;
    }

    private createChatSession(): ChatSession {
        console.log('method: createChatSession()');

        const chatSession: ChatSession = {
            chatSessionId: (this.chatSessionService.getAll().length + 2),
            user1: this.currentUser,
            user1Id: this.currentUser.contactNo,
            user2: this.sender,
            user2Id: this.sender.contactNo,
            user1Read: true,
            user2Read: false
        };
        return chatSession;
    }

    private createSenderFromCellNo() {
        console.log('method: createSenderFromCellNo()');

        let sender: User = null;

        if (this.validateCellNo()) {
            if (this.senderId === -1 && this.cellNo) {
                sender = {
                    contactNo: Number(this.cellNo),
                    name: this.cellNo,
                    displayName: this.cellNo
                };
            }
        }
        return sender;
    }

    private validateCellNo() {
        console.log('method: validateCellNo()');

        let valid = false;
        const isNumber = !isNaN(Number(this.cellNo));
        if (isNumber && this.cellNo.length === 10) {
            valid = true;
            console.log('Cell No valid');
        } else {
            console.log('Cell No not valid');
        }
        return valid;
    }

    private updateChatSession() {
        console.log('method: updateChatSession');

        this.chatSession.lastMessage = this.message;
        this.chatSession.lastMessageDate = new Date().toDateString();
        this.chatSession.user1Read = this.chatSession.user1Id === this.currentUser.contactNo ? true : false;
        this.chatSession.user2Read = this.chatSession.user2Id === this.currentUser.contactNo ? true : false;
        this.chatSessionService.update(this.chatSession);
    }

    private addSender() {
        console.log('method: addSender()');
        if (this.cellNo) {
            this.userService.add(this.sender);
        }
    }

    private createSendModel (chat: Chat): Send {
        console.log('method: createSendModel');
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
        console.log('method: sendSms()');
        this.smsService.sendSms(send).toPromise();
    }

    private createCurrentUserFromFromCellNo() {
        console.log('method: createCurrentUserFromFromCellNo()');

        let currentUser: User = null;
        if (this.currentUserId === -1 && this.fromCell) {
            currentUser = {
                contactNo: Number(this.fromCell),
                name: this.fromCell,
                displayName: this.fromCell
            };
        }
        return currentUser;
    }

    private validateFromCellNo() {
        console.log('method: validateFromCellNo()');

        let valid = false;
        const isNumber = !isNaN(Number(this.fromCell));
        if (isNumber && this.fromCell.length === 10) {
            valid = true;
            console.log('From Cell valid');
        } else {
            console.log('From Cell not valid');
        }
        return valid;
    }

    //#endregion method

}
