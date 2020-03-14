export interface LoginDescriptorInterface {
    token_type: string;
    expired_in: string;
    access_token: string;
    refresh_token: string;
    user: OperatorDescriptorInterface;
}

export interface OperatorDescriptorInterface {
    id: string;
    role: string;
    avatar: string;
    name: string;
    surname: string;
    email: string;
    phone_main: string;
    phone_country: string;
}

export enum Gender {
    male = 'm',
    female = 'f'
}

export enum UserAccount {
    pending = 'pending',
    active = 'active'
}

export interface UserDescriptorInterface {
    id: string;
    email: string;
    name: string;
    surname: string;
    gender: Gender;
    account: UserAccount;
    fiscal_code: string;
    phone_country: string;
    phone_main: string;
    info: string;
    emergency_contacts: string;
    residential_address: string;
    resident: boolean;
    location: {
        latitude: string;
        longitude: string;
        name: string;
    };
    birthplace: string;
    avatar: string;
    dob:	string;
    created_at:	string;
    updated_at: string;
}

export interface UserFilters {
    platform_name: string;
    term: string;
    gender: string;
    from_date_dob: string;
    to_date_dob:	string;
    resident: boolean;
}


export interface UserGroupDescriptorInterface {
    id: string;
    name: string;
    description: string;
    filters: UserFilters;
    createdAt: number;
    updatedAt: number;
}

export enum NoticeType {
    normal = 'normal',
    scheduled = 'scheduled'
}

export interface NoticeAttachmentMeta {
    name: string;
    type: string;
    url: string;
}

export interface NoticeDescriptorInterface {
    id: string;
    title: string;
    body: string;
    titlePreview: string;
    bodyPreview: string;
    frequencyDate: string;
    frequencyTime: string;
    type: NoticeType;
    category: CategoryDescriptorInterface;
    attachments: NoticeAttachmentMeta[];
    recipientsGroupName: string;
}

export interface CompactUser {
    id: string;
    fullName: string;
    avatar: string;
}

export enum NoticeStatus {
    sent = 'sent',
    delivered = 'delivered',
    readed = 'readed'
}

export interface NoticeLogs {
    status: string;
    date: string;
}

export interface NoticeFeedDescriptorInterface {
    receiver: CompactUser;
    status: NoticeStatus;
    log: NoticeLogs[];
    updatedAt: string;
}

export interface InquiryOperator {
    id: string;
    fullname: string;
    avatar: string;
}

export interface InquiryDescriptorInterface {
    id: string;
    type: string;
    recipientsGroupName: string;
    operator: InquiryOperator;
    createdAt: string;
    updatedAt: string;
}

export enum InquiryFeedStatus {
    sent = 'sent',
    delivered = 'delivered',
    readed = 'readed',
    withResponse = 'withResponse'
}

export interface InquiryFeedLogs {
    status: string;
    date: string;
}

export interface InquiryFeedDescriptorInterface {
    receiver: CompactUser;
    operator: InquiryOperator;
    status: InquiryFeedStatus;
    type: string;
    origin: string;
    receiver_payload: {
        status: string;
        latitude: string;
        longitude: string;
    };
    logs: InquiryFeedLogs[];
    createdAt: string;
    updatedAt: string;
}

export enum PlatformName {
    ios = 'ios',
    android = 'android'
}

export interface DeviceDescriptorInterface {
    id: string;
    fcm: string;
    model: string;
    platformName: PlatformName;
    platformVersion: string;
    name: string;
    user: CompactUser;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryDescriptorInterface {
    id: string;
    name: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoticeFeedStatsDescriptorInterface {
    receivers: string;
    readed: {
        amount: string,
        percentage: string
    };
    delivered: {
        amount: string,
        percentage: string
    };
    sent: {
        amount: string,
        percentage: string
    };
}

export interface InquiryFeedStatsDescriptorInterface {
    receivers: string;
    sent: {
        amount: string;
        percentage: string;
    };
    delivered: {
        amount: string;
        percentage: string
    };
    readed: {
        amount: string;
        percentage: string
    };
    with_response: {
        amount: string;
        percentage: string
    };
}

export interface AuditDescriptorInterface {
    operator: {
        operators: string,
        administrators: string
    };
    users: {
        registered: string
    };
    groups: {
        registered: string
    };
    notices: {
        sent: string,
        latest: {
            delivered: {
                amount: string,
                percentage: string
            },
            readed: {
                amount: string,
                percentage: string
            },
            sent: {
                amount: string,
                percentage: string
            }
        }
    };
    inquiry: {
        geoclaim: {
            sent: string
        };
        areyoufine: {
            sent: string
        };
    };
    signals: {
        received: string
    };
    devices: {
        registered: string
    };
}

export interface UsersStatsDescriptorInterface {
    locations: {
        registered: {
            amount: string,
            percentage: string
        },
        unregistered: {
            amount: string,
            percentage: string
        }
    };
}

export interface UserLocationDescriptorInterface {
    id: string;
    full_name: string;
    avatar: string;
    location: {
        latitude: string,
        longitude: string,
        name: string
    };
}

export interface SignalResponseAttachmentMetaDescriptorInterface {
    name: string;
    type: string;
    url: string;
}

export interface SignalResponseDescriptorInterface {
    id: string;
    body: string;
    sender: {
        id: string,
        full_name: string,
        avatar: string
    };
    attachments: [SignalResponseAttachmentMetaDescriptorInterface];
    created_at: string;
}

export interface SignalDescriptorInterface {
    id: string;
    object: string;
    body: string;
    category: CategoryDescriptorInterface;
    responses: [SignalResponseDescriptorInterface];
    attachments: [
        {
            name: string,
            type: string,
            url: string
        }
    ];
    sender: CompactUser;
    created_at: string;
    updated_at: string;
}
