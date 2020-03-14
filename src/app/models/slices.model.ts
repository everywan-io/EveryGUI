export enum SliceType {
    'IPv4VPN' = 'IPv4VPN',
    'SRv6' = 'SRv6'
}

export class Slice {
    name: string;
    type: SliceType;
    tenantid: string;
    interfaces: [];
    mode: string;

    defineExtraProperties() {
        
    }
}
