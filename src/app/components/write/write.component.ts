import { Component } from '@angular/core';

@Component({
    selector: 'app-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.css']
})
export class WriteComponent {
    title: string;

    constructor() {
        this.title = 'Write';
    }
}
