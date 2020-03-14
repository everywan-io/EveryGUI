import { NoticeDescriptorInterface } from '@configs/network/api.descriptors';
import { Notice } from '@models/notices.model';


export class NoticesFactory {
    static create(source: NoticeDescriptorInterface[] | NoticeDescriptorInterface | Notice ): Notice [] | Notice {
        if (source instanceof Array) {
            return source.map((descriptor: NoticeDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Notice) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: Notice): Notice {
        const copy: Notice = new Notice();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: NoticeDescriptorInterface): Notice {
        const duplicateKeys = [
            'id',
            'title',
            'body',
            'titlePreview',
            'bodyPreview',
            'frequencyDate',
            'frequencyTime',
            'type',
            'category',
            'attachments',
            'recipientsGroupName',
            'createdAt',
            'updatedAt'
        ];
        const instance: Notice = new Notice();

        duplicateKeys.forEach((key) => {
            if (key === 'titlePreview') {
                instance[key] = descriptor['title_preview'];
            } else if (key === 'bodyPreview') {
                instance[key] = descriptor['body_preview'];
            } else if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else if (key === 'recipientsGroupName') {
                instance[key] = descriptor['recipients_group_name'];
            } else if (key === 'frequencyDate') {
                instance[key] = descriptor['frequency_date'];
            } else if (key === 'frequencyTime') {
                instance[key] = descriptor['frequency_time'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        return instance;
    }

}
