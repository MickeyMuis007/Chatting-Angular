import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RECEIVES } from './mock/mock-receives';
import { Receive } from 'src/app/models/chat/receive.model';

@Injectable({
    providedIn: 'root'
})
export class SmsReceiveService {
    private baseUrl: string;
    private receives: Receive[];

    constructor(private httpClient: HttpClient) {
        this.baseUrl = 'https://localhost:5001/api/receive';
        this.receives = RECEIVES;
    }

    get() {
        return this.receives;
    }

    getApi() {
        return this.httpClient.get(this.baseUrl);
    }
}
