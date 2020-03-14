export class TenantConfig {
    port: string;
    info: string;
}

export class Tenant {
    id: string;
    name: string;
    domainId: string;
    config: TenantConfig;
    token: string;
    
    defineExtraProperties() {
        
    }
}
