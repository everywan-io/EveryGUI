import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Notice } from '@models/notices.model';
import { NoticesService } from '@modules/notices/notices.service';


@Injectable()
export class NoticeResolver implements Resolve<Observable<Notice>> {
    constructor(private noticeService: NoticesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Notice> {
        const noticeIdentifier: string = route.paramMap.get('id');

        return this.noticeService.get(noticeIdentifier)
            .pipe(
                map((notice: Notice) => notice)
            );
    }

}
