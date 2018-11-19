/* Angular imports */
import { Component, OnInit } from '@angular/core';


/* Import Models */
import { User } from 'src/app/models/chat/user.model';
import { Chat } from 'src/app/models/chat/chat';
import { ChatSession } from 'src/app/models/chat/chat-session';

/* Import Services */
import { UserService } from 'src/app/services/chat/user.service';
import { ChatSessionService } from 'src/app/services/chat/chat-session.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

    /**************
     * Constructor
     **************/
    //#region constructor

    constructor(
        private userService: UserService,
        private chatSessionService: ChatSessionService,
        private chatService: ChatService,
        private toastr: ToastrService
    ) {
        this.title = 'Write';
    }

    //#endregion constructor


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
    chatSession: ChatSession;

    //#endregion properties

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

        this.currentUser = this.userService.getUser(Number(this.currentUserId));

        this.validateSendButton();
        this.chatSessionExist();
    }

    senderChanged() {
        console.log('\nevent: senderChanged() -> Sender Changed');

        this.sender = this.userService.getUser(Number(this.senderId));
        this.validateSendButton();
        this.chatSessionExist();
    }

    cellNoKeyUp() {
        console.log('\nevent: cellNoKeyUp()');

        this.validateSendButton();
    }

    send() {
        console.log('\nevent: send() -> Sending Message');

        if (this.message) {
            console.log('Send messages.....');

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

        if ((Number(this.senderId) !== -1 || this.cellNo) && this.currentUser.userId !== Number(this.senderId)) {
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

        // Create disable model that will be used for all disabling components. Set all disabling to default state.
        this.disableSendButton();
    }

    private chatSessionExist() {
        console.log('method: chatSessionExist()');
        console.log('Chat Session Exist: ' +
            this.chatSessionService.chatSessionExist(Number(this.currentUser.userId), Number(this.senderId)));

        return this.chatSessionService.chatSessionExist(Number(this.currentUser.userId), Number(this.senderId));
    }

    private getChatSession() {
        console.log('method: getChatSesison()');

        this.chatSession = this.chatSessionService.getExistingChatSession(Number(this.currentUser.userId), Number(this.senderId));
    }

    private createChat(): Chat {
        console.log('method: createChat()');

        const chat: Chat = {
            chatId: (this.chatService.get().length + 2),
            chatSessionId: this.chatSession.chatSessionId,
            senderId: this.currentUser.userId,
            sender: this.currentUser,
            receiverId: (this.chatSession.user1Id === this.currentUser.userId ? this.chatSession.user2Id : this.chatSession.user1Id),
            receiver: (this.chatSession.user1Id === this.currentUser.userId ? this.chatSession.user2 : this.chatSession.user1),
            dateUpdated: new Date(),
            message: this.message
        };
        return chat;
    }

    private createChatSession(): ChatSession {
        const chatSession: ChatSession = {
            chatSessionId: (this.chatSessionService.getAll().length + 2),
            user1: this.currentUser,
            user1Id: this.currentUser.userId,
            user2: this.sender,
            user2Id: this.sender.userId
        };
        return chatSession;
    }
    //#endregion method

}
