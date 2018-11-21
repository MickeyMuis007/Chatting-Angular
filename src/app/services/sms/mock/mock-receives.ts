import { Receive } from 'src/app/models/chat/receive.model';

export const RECEIVES: Receive[] = [
    { receivedSMSId: 1, fromCell: '0213233234', toCell: '0784342525', message: 'Hi',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 2, fromCell: '0213233234', toCell: '0784342525', message: 'Hows things',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 3, fromCell: '0833737773', toCell: '0784342525', message: 'Yo its 13',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 4, fromCell: '0833737773', toCell: '0784342525', message: 'What you doing?',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 5, fromCell: '0833737773', toCell: '0784342525', message: 'Im not doing much',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 6, fromCell: '0732332342', toCell: '0784342525', message: 'Yo its 14, where you at!',
        dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
    { receivedSMSId: 7, fromCell: '0732332342', toCell: '0784342525', message: 'Im home',
         dateReceiver: '20101121103915', operator: '', customerId: 1, messageId: 1234567 },
];
