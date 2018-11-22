import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RECEIVES } from './mock/mock-receives';
import { Receive } from 'src/app/models/sms/receive.model';

@Injectable({
    providedIn: 'root'
})
export class SmsReceiveService {
    private baseUrl: string;
    private charlUrl: string;
    private receives: Receive[];

    constructor(private httpClient: HttpClient) {
        this.baseUrl = 'https://localhost:5001/api/receive';
        this.charlUrl = 'http://192.168.118.68/SMS.API/v1/SMS/GetReceivedSMS';
        this.receives = RECEIVES;
    }

    get() {
        return this.receives;
    }

    getApi() {
        return this.httpClient.get(this.baseUrl);
    }

    getCharlApi() {
        return this.httpClient.get(this.charlUrl);
    }
}
