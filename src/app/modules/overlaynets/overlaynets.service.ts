import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {OverlayNet} from '@models/overlaynets.model';
import {ApiService} from '@modules/network/api.service';
import {OverlayNetsFactory} from '@models/factories/overlaynets.factory';
import {OverlayNetDescriptorInterface} from '@configs/network/api.descriptors';


@Injectable()
export class OverlayNetsService {
    constructor(private API: ApiService) {

    }

    create(payload: any): Observable<OverlayNet> {
        return this.API.OverlayNets
            .create(payload)
            .pipe(
                map((overlaynet: OverlayNetDescriptorInterface) => OverlayNetsFactory.create(overlaynet) as OverlayNet)
            );
    }

    get(identifier: string): Observable<OverlayNet> {
        return this.API.OverlayNets
            .get({ id: identifier })
            .pipe(
                map((overlaynet: OverlayNetDescriptorInterface) => OverlayNetsFactory.create(overlaynet) as OverlayNet)
            );
    }

    fetch(payload: any): Observable<OverlayNet[]> {
        return this.API.OverlayNets
            .fetch(payload)
            .pipe(
                 map((overlaynets: OverlayNetDescriptorInterface[]) => OverlayNetsFactory.create(overlaynets) as OverlayNet[])
            );
    }

    delete(id: string) {
        return this.API.OverlayNets.delete({ id: id });
    }
}
