import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateConvertor {
    convertDateReceiver(dateStr: string): Date {
        const str = dateStr;                       // '20101121103915'
        const year = Number(str.substring(0, 4));
        const month = Number(str.substring(4, 6));
        const day = Number(str.substring(6, 8));
        const hour = Number(str.substring(8, 10));
        const minute = Number(str.substring(10, 12));
        const second = Number(str.substring(12, 14));
        const date = new Date(year, month - 1, day, hour, minute, second);
        return date;
    }
}
