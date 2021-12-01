

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
    username: string;
    phone_country: string;
    phone_main: string;
    email: string;
    project_id: string;
    project_name: string;
}

export enum Gender {
    male = 'm',
    female = 'f'
}

export enum DeviceType {
    ROUTER = 'router',
}


export enum NatType {
    OPEN = 'Open',
    FULL_CONE_NAT = 'Full-cone NAT',
    RESTRICTED_CONE_NAT = 'Restricted-cone NAT',
    RESTRICTED_PORT_NAT = 'Restricted-port NAT',
    SYMMETRIC_NAT = 'Symmetric NAT',
    UDP_FIREWALL = 'UDP Firewall',
    BLOCKED = 'Blocked'
}

export interface DeviceDescriptorInterface {
    deviceid: string;
    type: DeviceType;
    loopbackip: string;
    name: string;
    description: string;
    loopbacknet: string;
    mgmtip: string;
    interfaces: [];
    features: [];
    nat_type: NatType;
    registration_timestamp: string;
    connected: boolean;
    enabled: boolean;
    configured: boolean;
    tenantid: string;
    tunnel_info: string;
    tunnel_mode: string;
}

export interface MeasurementDescriptorDelay {
    id: number;
    timestamp: number;
    value: number;
}

export interface MeasurementDescriptorResultsDelay {
    delays: MeasurementDescriptorDelay;
    averageDelay: number;
}

export interface MeasurementDescriptorResults {
    delayDirectPath: MeasurementDescriptorResultsDelay;
    delayReturnPath: MeasurementDescriptorResultsDelay;
}

export interface MeasurementDescriptorInterface {
    sessionId: string;
    sessionDescription: string;
    senderName: string;
    reflectorName: string;
    status: string;
    delayDirectPath: number;
    delayReturnPath: number;
    authenticationMode: string;
    keyChain: string;
    timestampFormat: string;
    delayMeasurementMode: string;
    sessionReflectorMode: string;
    senderDeviceId: string;
    senderStampIp: string;
    reflectorDeviceId: string;
    reflectorStampIp: string;
    sidlist: string;
    returnSidlist: string;
    results: MeasurementDescriptorResults;
    overlayId: string;
    overlayName: string;
    duration: number;
}

export enum InterfaceType {
    LAN = 'lan',
    WAN = 'wan',
    UNKNOWN = 'unknown'
}

export interface InterfaceDescriptorInterface {
    deviceid: string;
    name: string;
    mac_addr: string;
    ipv4_addrs: [];
    ipv6_addrs: [];
    ipv4_subnets: [];
    ipv6_subnets: [];
    ext_ipv4_addrs: [];
    ext_ipv6_addrs: [];
    type: InterfaceType;
}

export interface SliceDescriptorInterface {
    name: string;
    type: string;
    mode: string;
    interfaces: [];
    tenantid: string;
}


export interface OverlayNetDescriptorInterface {
    id: string;
    name: string;
    type: string;
    slices: [];
    tenantid: string;
    tunnel_mode: string;
}

export interface TenantConfigDescriptorInterface {
    vxlan_port: string;
}

export interface TenantDescriptorInterface {
    tenantid: string;
    name: string;
    domain_id: string;
    vtep_ip_index: number;
    reutep_ip_addr: [];
    assigned_vtep_ip_addr: number;
    vni_index: number;
    reu_vni: [];
    assigned_vni: number;
    counters: {};
    config: TenantConfigDescriptorInterface;
    token: string;
    info: string;
}


export interface DashboardDescriptorInterface {

}