import { InquiryFeedDescriptorInterface } from '@configs/network/api.descriptors';
import { InquiryFeed } from '@models/inquiryFeeds.model';

export class InquiryFeedsFactory {
    static create(source: InquiryFeedDescriptorInterface[] | InquiryFeedDescriptorInterface | InquiryFeed ): InquiryFeed [] | InquiryFeed {
        if (source instanceof Array) {
            return source.map((descriptor: InquiryFeedDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof InquiryFeed) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: InquiryFeed): InquiryFeed {
        const copy: InquiryFeed = new InquiryFeed();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: InquiryFeedDescriptorInterface): InquiryFeed {
        const duplicateKeys = [
            'receiver',
            'operator',
            'status',
            'logs',
            'type',
            'origin',
            'receiverPayload',
            'createdAt',
            'updatedAt'
        ];
        const instance: InquiryFeed = new InquiryFeed();

        duplicateKeys.forEach((key) => {
            if (key === 'receiverPayload') {
                instance[key] = descriptor['receiver_payload'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else {
                instance[key] = descriptor[key];
                if (key === 'receiver') {
                    instance[key]['fullName'] = instance[key]['full_name'];
                    delete instance[key]['full_name'];
                }
            }
        });

        return instance;
    }

}
