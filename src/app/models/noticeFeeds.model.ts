import { CompactUser } from '@models/compactUsers.model';

export enum NoticeStatus {
    sent = 'sent',
    delivered = 'delivered',
    readed = 'readed'
}

export class NoticeLogs {
    status: string;
    date: string;
}

export class NoticeFeed {
    receiver: CompactUser;
    status: NoticeStatus;
    log: NoticeLogs[];
    updatedAt: string;
}
