import { InquiryFeedStatsDescriptorInterface } from '@configs/network/api.descriptors';
import { InquiryFeedStats } from '@models/inquiryFeedsStats.model';

export class InquiryFeedsStatsFactory {
    static create(source: InquiryFeedStatsDescriptorInterface[] | InquiryFeedStatsDescriptorInterface | InquiryFeedStats ): InquiryFeedStats [] | InquiryFeedStats {
        if (source instanceof Array) {
            return source.map((descriptor: InquiryFeedStatsDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof InquiryFeedStats) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: InquiryFeedStats): InquiryFeedStats {
        const copy: InquiryFeedStats = new InquiryFeedStats();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: InquiryFeedStatsDescriptorInterface): InquiryFeedStats {
        const duplicateKeys = [
            'receivers',
            'sent',
            'delivered',
            'readed',
            'with_response',
        ];
        const instance: InquiryFeedStats = new InquiryFeedStats();

        duplicateKeys.forEach((key) => {
            if (key === 'with_response') {
                instance['withResponse'] = descriptor['with_response'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        return instance;
    }

}
