import { CompactUser } from '@models/compactUsers.model';
import { InquiryOperator } from '@models/inquiries.model';

export enum InquiryFeedStatus {
    sent = 'sent',
    delivered = 'delivered',
    readed = 'readed',
    withResponse = 'with_response',
}

export class InquiryFeedLogs {
    status: string;
    date: string;
}

export class InquiryFeed {
    receiver: CompactUser;
    operator: InquiryOperator;
    status: InquiryFeedStatus;
    logs: InquiryFeedLogs[];
    type: string;
    origin: string;
    receiverPayload: {
        status: string;
        latitude: string;
        longitude: string;
    };
    createdAt: string;
    updatedAt: string;
}
