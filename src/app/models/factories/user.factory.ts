import { User } from '@models/user.model';
import { UserDescriptorInterface } from '@configs/network/api.descriptors';

export class UsersFactory {
    static create(source: UserDescriptorInterface[] | UserDescriptorInterface | User): User[] | User {
        if (source instanceof Array) {
            return source.map((descriptor: UserDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof User) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: User): User {
        const copy: User = new User();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: UserDescriptorInterface): User {
        const duplicateKeys = {
            domain: 'domain',
            username: 'username',
            email: 'email',
            password: 'password',
            confirmPassword: 'confirmPassword'
        };

        const instance: User = new User();
        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): User {
        const instance = new User();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
