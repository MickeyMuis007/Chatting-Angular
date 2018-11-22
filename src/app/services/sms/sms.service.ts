import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Sms } from 'src/app/models/sms/sms.model';

@Injectable({
    providedIn: 'root'
})
export class SmsService {
    private baseUrl;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = 'https://localhost:5001/api/sms/';
    }

    get() {
        return this.httpClient.get(this.baseUrl);
    }

    getSms(id: number) {
        return this.httpClient.get(this.baseUrl + id);
    }

    post(addSms: Sms) {
        return this.httpClient.post(this.baseUrl, addSms);
    }

    put(id, updateSms: Sms) {
        return this.httpClient.put(this.baseUrl + id, updateSms);
    }

    delete(id) {
        return this.httpClient.delete(this.baseUrl + id);
    }
}
