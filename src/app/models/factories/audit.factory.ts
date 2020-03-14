import { AuditDescriptorInterface } from '@configs/network/api.descriptors';
import { Audit } from '@models/audit.model';

export class AuditFactory {
    static create(source: AuditDescriptorInterface[] | AuditDescriptorInterface | Audit): Audit[] | Audit {
        if (source instanceof Array) {
            return source.map((descriptor: AuditDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Audit) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Audit): Audit {
        const copy: Audit = new Audit();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: AuditDescriptorInterface): Audit {
        const duplicateKeys = ['operator', 'users', 'groups', 'notices', 'inquiry', 'signals', 'devices'];
        const instance: Audit = new Audit();

        duplicateKeys.forEach(key => instance[key] = descriptor[key]);

        return instance;
    }

    static restoreFromStorage(descriptor): Audit {
        const instance = new Audit();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        return instance;
    }
}
