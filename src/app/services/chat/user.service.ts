import { Injectable } from '@angular/core';
import { User } from '../../models/chat/user.model';
import { USERS } from './mock/mock-users';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: User[];

    constructor() {
        this.reset();
    }

    get() {
        return this.users;
    }

    getUser(userId: number) {
        return this.users.find(user => user.userId === userId);
    }

    add(user: User) {
        this.users.push(user);
    }

    delete(id: number) {
    }

    update(id: number) {
    }

    clear() {
        this.users = [];
    }

    reset() {
        this.users = USERS;
    }
}
