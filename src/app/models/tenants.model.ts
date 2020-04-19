export class TenantConfig {
    vxlanPort: string;
    
}

export class Tenant {
    id: string;
    name: string;
    domainId: string;
    configured: boolean;
    vtepIpIndex: number;
    reutepIpAddr: [];
    assignedVtepIpAddr: number;
    vniIndex: number;
    reuVni: [];
    assignedVni: number;
    counters: {};
    config: TenantConfig;
    token: string;
    info: string;

    defineExtraProperties() {

    }
}
