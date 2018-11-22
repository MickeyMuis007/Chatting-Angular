import { Receive } from './receive.model';

export class ReceiveSmsResponse {
    success: boolean;
    message: string;
    data: Receive[];
}
