import { Component } from '@angular/core';

@Component({
    selector: 'app-inbox',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.css']
})
export class SentComponent {
    title: string;

    constructor() {
        this.title = 'Sent';
    }
}
