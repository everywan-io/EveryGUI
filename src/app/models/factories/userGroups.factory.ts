import { UserGroupDescriptorInterface } from '@configs/network/api.descriptors';
import { UserGroup } from '@models/userGroups.model';

export class UserGroupsFactory {
    static create(
        source: UserGroupDescriptorInterface[] |
            UserGroupDescriptorInterface |
            UserGroup): UserGroup[] | UserGroup {
        if (source instanceof Array) {
            return source.map((descriptor: UserGroupDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof UserGroup) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: UserGroup): UserGroup {
        const copy: UserGroup = new UserGroup();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: any): UserGroup {
        const duplicateKeys = [
            'id',
            'name',
            'description',
            'filters',
            'createdAt',
            'updatedAt'
        ];
        const instance: UserGroup = new UserGroup();

        duplicateKeys.forEach((key) => {
            if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updateAt') {
                instance[key] = descriptor['update_at'];
            } else if (key === 'filters') {
                instance[key] = {
                    term: '',
                    gender: '',
                    fromDateDob: '',
                    toDateDob: '',
                    platformName: '',
                    resident: null
                };
                instance[key].term = descriptor[key].term;
                instance[key].gender = descriptor[key].gender;
                instance[key].fromDateDob = descriptor.filters.from_date_dob;
                instance[key].toDateDob = descriptor.filters.to_date_dob;
                instance[key].platformName = descriptor.filters.platform_name;
                instance[key].resident = descriptor.filters.resident;
            } else {
                instance[key] = descriptor[key];
            }
        });
        return instance;
    }
}
