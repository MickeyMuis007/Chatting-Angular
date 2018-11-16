import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SmsService {

    /**
     * Send sms requires senders phone no and a message. I'll create a send model for this
     */
    sendSms() {
    }

    /**
     * This will be message that will be recieved from the sender. Will implement signalR to trigger this event on the back-end
     * receives sms
     */
    receiveSms() {
    }

    /**
     * Alternative way on getting recieved sms's. Is by just to go get sms's
     */
    getRecievedSms() {
    }
}
