import { Category } from '@models/categories.model';
import { CompactUser } from '@models/compactUsers.model';

export class SignalResponseAttachmentMeta {
    name: string;
    type: string;
    url: string;
}

export class SignalResponse {
    id: string;
    body: string;
    sender: {
        id: string,
        fullname: string,
        avatar: string
    };
    attachments: [SignalResponseAttachmentMeta];
    createdAt: string;
}

export class Signal {
    id: string;
    object: string;
    body: string;
    category: Category;
    responses: [SignalResponse];
    attachments: [
        {
            name: string,
            type: string,
            url: string
        }
    ];
    sender: CompactUser;
    createdAt: string;
    updatedAt: string;
}
