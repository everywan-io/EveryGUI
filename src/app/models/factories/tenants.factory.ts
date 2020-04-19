import { Tenant } from '@models/tenants.model';
import { TenantDescriptorInterface } from '@configs/network/api.descriptors';

export class TenantsFactory {
    static create(source: TenantDescriptorInterface[] | TenantDescriptorInterface | Tenant): Tenant[] | Tenant {
        if (source instanceof Array) {
            return source.map((descriptor: TenantDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Tenant) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Tenant): Tenant {
        const copy: Tenant = new Tenant();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: TenantDescriptorInterface): Tenant {
        const duplicateKeys = {
            id: 'tenantid',
            name: 'name',
            configured: 'configured',
            domainId: 'domain_id',
            vtepipIndex: 'vtep_ip_index',
            reuVtepIpAddr: 'reu_vtep_ip_addr',
            assignedVtepIpAddr: 'assigned_vtep_ip_addr',
            vniIndex: 'vni_index',
            assignedVni: 'assigned_vni',
            reuVni: 'reu_vni',
            counters: 'counters',
            config: 'config',
            info: 'info',
            token: 'token'
        };

        const instance: Tenant = new Tenant();
  
        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Tenant {
        const instance = new Tenant();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
