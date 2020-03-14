import { Category } from '@models/categories.model';

export enum NoticeType {
    normal = 'normal',
    scheduled = 'scheduled'
}

export class NoticeAttachmentMeta {
    name: string;
    type: string;
    url: string;
}

export class Notice {
    id: string;
    title: string;
    body: string;
    titlePreview: string;
    bodyPreview: string;
    frequencyDate: string;
    frequencyTime: string;
    type: NoticeType;
    category: Category;
    attachments: NoticeAttachmentMeta[];
    recipientsGroupName: string;
    createdAt: string;
    updatedAt: string;
}
