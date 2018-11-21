import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chat } from 'src/app/models/chat/chat';

@Injectable({
    providedIn: 'root'
})
export class SmsSendService {
    constructor(
        private httpClient: HttpClient
    ) {
    }


}
