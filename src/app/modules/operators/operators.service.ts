import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Operator} from '@models/operators.model';
import {ApiService} from '@modules/network/api.service';
import {OperatorsFactory} from '@models/factories/operators.factory';
import {OperatorDescriptorInterface} from '@configs/network/api.descriptors';


@Injectable()
export class OperatorsService {
    constructor(private API: ApiService) {

    }

    create(payload: any): Observable<Operator> {
        return this.API.Operators
            .create(payload)
            .pipe(
                map((operator: OperatorDescriptorInterface) => OperatorsFactory.create(operator) as Operator)
            );
    }

    get(identifier: string): Observable<Operator> {
        return this.API.Operators
            .get({ id: identifier })
            .pipe(
                map((operator: OperatorDescriptorInterface) => OperatorsFactory.create(operator) as Operator)
            );
    }

    delete(id: string) {
        return this.API.Operators.delete({ id: id });
    }

    update(payload: any): Observable<Operator> {
        return this.API.Operators
            .update(payload)
            .pipe(
                map((operator: OperatorDescriptorInterface) => OperatorsFactory.create(operator) as Operator)
            );
    }

    fetch(payload: any): Observable<Operator[]> {
        return this.API.Operators
            .fetch(payload)
            .pipe(
                 map((operators: OperatorDescriptorInterface[]) => OperatorsFactory.create(operators) as Operator[])
            );
    }
}
