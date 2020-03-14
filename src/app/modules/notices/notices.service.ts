import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Notice } from '@models/notices.model';
import {
    CategoryDescriptorInterface, NoticeFeedStatsDescriptorInterface,
    NoticeDescriptorInterface,
    NoticeFeedDescriptorInterface,
    UserGroupDescriptorInterface
} from '@configs/network/api.descriptors';
import { NoticesFactory } from '@models/factories/notices.factory';
import { NoticeFeed } from '@models/noticeFeeds.model';
import { NoticeFeedsFactory } from '@models/factories/noticeFeeds.factory';
import { UserGroup } from '@models/userGroups.model';
import { UserGroupsFactory } from '@models/factories/userGroups.factory';
import { Category } from '@models/categories.model';
import { CategoriesFactory } from '@models/factories/categories.factory';
import { NoticeFeedsStats } from '@models/noticeFeedsStats.model';
import { NoticeFeedsStatsFactory } from '@models/factories/noticeFeedsStats.factory';


@Injectable()
export class NoticesService {

    constructor( private API: ApiService ) {}

    fetch(payload: any): Observable<Notice[]> {
        return this.API.Notices
            .fetch(payload)
            .pipe(
                map((notices: NoticeDescriptorInterface[]) => NoticesFactory.create(notices) as Notice[])
            );
    }

    create(payload: any): Observable<Notice> {
        return this.API.Notices
            .create(payload)
            .pipe(
                map((notice: NoticeDescriptorInterface) => NoticesFactory.create(notice) as Notice)
            );
    }

    get(id: string): Observable<Notice> {
        return this.API.Notices
            .get({id: id})
            .pipe(
                map((notice: NoticeDescriptorInterface) => NoticesFactory.create(notice) as Notice)
            );
    }

    reSend(payload: any): Observable<any> {
        return this.API.Notices
            .reSend(payload)
            .pipe(
                map((res) => res)
            );
    }

    fetchNoticeFeeds(payload: any): Observable<NoticeFeed[]> {
        return this.API.Notices
            .getFeeds(payload)
            .pipe(
                map((noticeFeeds: NoticeFeedDescriptorInterface[]) => NoticeFeedsFactory.create(noticeFeeds) as NoticeFeed[])
            );
    }

    getFeedsStats(id: string): Observable<NoticeFeedsStats> {
        return this.API.Notices
            .getStats({id: id})
            .pipe(
                map((stats: NoticeFeedStatsDescriptorInterface) => NoticeFeedsStatsFactory.create(stats) as NoticeFeedsStats)
            );
    }

    fetchGroups(payload: any): Observable<UserGroup[]> {
        return this.API.UserGroup
            .fetch(payload)
            .pipe(
                map( (groups: UserGroupDescriptorInterface[]) => UserGroupsFactory.create(groups) as UserGroup[])
            );
    }

    fetchCategories(): Observable<Category[]> {
        return this.API.Categories
            .fetch()
            .pipe(
                map((categories: CategoryDescriptorInterface) => CategoriesFactory.create(categories) as Category[])
            );
    }

}
