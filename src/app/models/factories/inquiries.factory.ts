import { InquiryDescriptorInterface } from '@configs/network/api.descriptors';
import { Inquiry } from '@models/inquiries.model';


export class InquiriesFactory {
    static create(source: InquiryDescriptorInterface[] | InquiryDescriptorInterface | Inquiry ): Inquiry [] | Inquiry {
        if (source instanceof Array) {
            return source.map((descriptor: InquiryDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Inquiry) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: Inquiry): Inquiry {
        const copy: Inquiry = new Inquiry();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: InquiryDescriptorInterface): Inquiry {
        const duplicateKeys = [
            'id',
            'type',
            'recipientsGroupName',
            'operator',
            'createdAt',
            'updatedAt'
        ];
        const instance: Inquiry = new Inquiry();

        duplicateKeys.forEach((key) => {
            if (key === 'recipientsGroupName') {
                instance[key] = descriptor['recipients_group_name'];
            } else if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        return instance;
    }

}
