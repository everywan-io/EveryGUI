import {SignalDescriptorInterface, SignalResponseDescriptorInterface} from '@configs/network/api.descriptors';
import {Signal, SignalResponse} from '@models/signals.model';


export class SignalsFactory {

    static create(source: SignalDescriptorInterface[] | SignalDescriptorInterface | Signal ): Signal [] | Signal {
        if (source instanceof Array) {
            return source.map((descriptor: SignalDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Signal) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);

    }

    static createFromInstance(instance: Signal): Signal {
        const copy: Signal = new Signal();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: SignalDescriptorInterface): Signal {
        const duplicateKeys = [
            'id',
            'object',
            'body',
            'category',
            'responses',
            'attachments',
            'sender',
            'createdAt',
            'updatedAt'
        ];
        const instance: Signal = new Signal();

        duplicateKeys.forEach((key: string) => {
            if (key === 'createdAt') {
                instance[key] = descriptor['created_at'];
            } else if (key === 'updatedAt') {
                instance[key] = descriptor['updated_at'];
            } else if (key === 'sender') {
                instance[key] = descriptor[key];
                instance[key]['fullName'] = descriptor[key]['fullname'];
                delete instance[key]['fullname'];
            } else {
                instance[key] = descriptor[key];
            }
        });

        if (!instance['sender'].avatar) {
            instance['sender'].avatar = '/assets/images/avatar_default.jpg';
        }

        return instance;
    }

    static createResponse(source: SignalResponseDescriptorInterface[] | SignalResponseDescriptorInterface | SignalResponse ): SignalResponse [] | SignalResponse {
        if (source instanceof Array) {
            return source.map((descriptor: SignalResponseDescriptorInterface) => this.createResponseFromDescriptor(descriptor));
        }

        return (source instanceof SignalResponse) ?
            this.createResponseFromInstance(source) :
            this.createResponseFromDescriptor(source);

    }

    static createResponseFromInstance(instance: SignalResponse): SignalResponse {
        const copy: SignalResponse = new SignalResponse();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createResponseFromDescriptor(descriptor: SignalResponseDescriptorInterface): SignalResponse {
        const duplicateKeys = [
            'id',
            'body',
            'sender',
            'createdAt',
            'updatedAt'
        ];
        const instance: SignalResponse = new SignalResponse();

        duplicateKeys.forEach((key: string) => {
            if (key === 'createdAt') {
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
