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
            id: 'id',
            name: 'name',
            domainId: 'domain_id',
            config: 'config',
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
