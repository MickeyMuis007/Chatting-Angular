import { Component } from '@angular/core';
import { User } from 'src/app/models/chat/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    user: User;

}
