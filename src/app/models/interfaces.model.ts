export enum InterfaceType {
    LAN = 'lan',
    WAN = 'wan',
    UNKNOWN = 'unknown'
}

export class Interface {
    deviceid: string;
    name: string;
    macaddr: string;
    ipv4Addrs: [];
    ipv6Addrs: [];
    ipv4Subnets: [];
    ipv6Subnets: [];
    extIpv4Addrs: [];
    extIpv6Addrs: [];
    type: InterfaceType;
    device_name: string;

    defineExtraProperties() {
        
    }
}
