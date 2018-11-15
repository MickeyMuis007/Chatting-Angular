import { Component } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent {
    title: string;

    constructor() {
        this.title = 'Chat';
    }
}
