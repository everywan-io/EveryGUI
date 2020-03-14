import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Device } from '@models/devices.model';
import { DeviceDescriptorInterface } from '@configs/network/api.descriptors';
import { DevicesFactory } from '@models/factories/devices.factory';


@Injectable()
export class DevicesService {
    constructor(private API: ApiService) {}

    fetch(payload: any): Observable<Device> {
        return this.API.Devices
            .fetch(payload)
            .pipe(
                map((devices: DeviceDescriptorInterface) => DevicesFactory.create(devices) as Device[])
            );
    }

}
