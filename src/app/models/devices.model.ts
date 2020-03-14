import { CompactUser } from '@models/compactUsers.model';


export enum PlatformName {
    ios = 'ios',
    android = 'android'
}

export class Device {
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
