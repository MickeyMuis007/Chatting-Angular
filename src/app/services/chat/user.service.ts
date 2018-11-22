import { Injectable } from '@angular/core';
import { User } from '../../models/chat/user.model';
import { USERS } from './mock/mock-users';

import { SmsReceiveService } from '../sms/sms-receive.service';
import { Receive } from 'src/app/models/sms/receive.model';
import { ReceiveSmsResponse } from 'src/app/models/sms/receiveSmsResponse.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: User[];

    constructor(
        private smsReceiveService: SmsReceiveService
    ) {
        this.reset();
    }

    get() {
        return this.users;
    }

    getUser(contactNo: number) {
        return this.users.find(user => user.contactNo === contactNo);
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
        this.clear();
        this.mapToUsers();
        // this.users = USERS;
    }

    private mapToUsers() {
        this.setMyApiUsers();
        // this.setCharlApiUsers();
        // this.setMockUsers();
    }

    private createUser(contactNo: string, name: string): User {
        return {
            contactNo: Number(contactNo),
            name: name,
            displayName: name
        };
    }

    private setMockUsers() {
        const receives = this.smsReceiveService.get();
        receives.forEach((item) => {
            if (!this.users.some(t => t.contactNo === Number(item.fromCell))) {
                this.users.push(this.createUser(item.fromCell, item.fromCell));
            } else if (!this.users.some(t => t.contactNo === Number(item.toCell))) {
                this.users.push(this.createUser(item.toCell, item.toCell));
            }
        });
    }

    private setMyApiUsers() {
        this.smsReceiveService.getApi().toPromise().then((res: Receive[]) => {
            res.forEach((item) => {
                if (!this.users.some(t => t.contactNo === Number(item.fromCell))) {
                    this.users.push(this.createUser(item.fromCell, item.fromCell));
                } else if (!this.users.some(t => t.contactNo === Number(item.toCell))) {
                    this.users.push(this.createUser(item.toCell, item.toCell));
                }
            });
        });
    }

    private setCharlApiUsers() {
        this.smsReceiveService.getCharlApi().toPromise().then((res: ReceiveSmsResponse) => {
            res.data.forEach((item) => {
                if (!this.users.some(t => t.contactNo === Number(item.fromCell))) {
                    this.users.push(this.createUser(item.fromCell, item.fromCell));
                } else if (!this.users.some(t => t.contactNo === Number(item.toCell))) {
                    this.users.push(this.createUser(item.toCell, item.toCell));
                }
            });
        });
    }
}
