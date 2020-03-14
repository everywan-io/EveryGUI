import { UserDescriptorInterface } from '@configs/network/api.descriptors';
import { User } from '@models/users.model';


export class UsersFactory {
    static create(source: UserDescriptorInterface[] | UserDescriptorInterface | User ): User [] | User {
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

        const duplicateKeys = [
            'id',
            'email',
            'name',
            'surname',
            'gender',
            'account',
            'fiscalCode',
            'info',
            'emergencyContacts',
            'residentialAddress',
            'resident',
            'location',
            'birthplace',
            'avatar',
            'dob',
            'createdAt',
            'updatedAt',
        ];
        const instance: User = new User();

        duplicateKeys.forEach((key) => {
            if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else if (key === 'fiscalCode') {
                instance[key] = descriptor['fiscal_code'];
            } else if (key === 'emergencyContacts') {
                instance[key] = descriptor['emergency_contacts'];
            } else if (key === 'residentialAddress') {
                instance[key] = descriptor['residential_address'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        instance.phone = {
            prefix: descriptor.phone_country || '+39',
            number: descriptor.phone_main || '',
            formatted: `${descriptor.phone_country || ''} ${descriptor.phone_main || ''}`
        };


        if (!instance.avatar) {
            instance.avatar = '/assets/images/avatar_default.jpg';
        }

        instance.defineExtraProperties();

        return instance;
    }

}
