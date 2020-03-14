import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Device} from '@models/devices.model';
import {ApiService} from '@modules/network/api.service';
import {DevicesFactory} from '@models/factories/devices.factory';
import {DeviceDescriptorInterface, InterfaceDescriptorInterface} from '@configs/network/api.descriptors';
import { Interface } from '@everywan/models/interfaces.model';
import { InterfacesFactory } from '@everywan/models/factories/interfaces.factory';


@Injectable()
export class DevicesService {
    constructor(private API: ApiService) {

    }

    enable(identifier: string): Observable<Device> {
        return this.API.Devices
            .enable({ id: identifier })
            .pipe(
                map((device: DeviceDescriptorInterface) => DevicesFactory.create(device) as Device)
            );
    }

    disable(identifier: string): Observable<Device> {
        return this.API.Devices
            .disable({ id: identifier })
            .pipe(
                map((device: DeviceDescriptorInterface) => DevicesFactory.create(device) as Device)
            );
    }

    configure(payload: any): Observable<Device> {
        return this.API.Devices
            .configure(payload)
            .pipe(
                map((device: DeviceDescriptorInterface) => DevicesFactory.create(device) as Device)
            );
    }

    get(identifier: string): Observable<Device> {
        return this.API.Devices
            .get({ id: identifier })
            .pipe(
                map((device: DeviceDescriptorInterface) => DevicesFactory.create(device) as Device)
            );
    }

    fetch(payload: any): Observable<Device[]> {
        return this.API.Devices
            .fetch(payload)
            .pipe(
                 map((devices: DeviceDescriptorInterface[]) => DevicesFactory.create(devices) as Device[])
            );
    }

    getInterfaces(payload: any): Observable<Interface[]> {
        return this.API.Devices
            .fetchInterfaces(payload)
            .pipe(
                 map((interfaces: InterfaceDescriptorInterface[]) => InterfacesFactory.create(interfaces) as Interface[])
            );
    }
}
