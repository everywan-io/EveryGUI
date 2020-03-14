import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Inquiry } from '@models/inquiries.model';
import {
    InquiryDescriptorInterface,
    InquiryFeedDescriptorInterface,
    InquiryFeedStatsDescriptorInterface,
    UserGroupDescriptorInterface,
} from '@configs/network/api.descriptors';
import { InquiriesFactory } from '@models/factories/inquiries.factory';
import { InquiryFeed } from '@models/inquiryFeeds.model';
import { InquiryFeedsFactory } from '@models/factories/inquiryFeeds.factory';
import { UserGroup } from '@models/userGroups.model';
import { UserGroupsFactory } from '@models/factories/userGroups.factory';
import { InquiryFeedStats } from '@models/inquiryFeedsStats.model';
import { InquiryFeedsStatsFactory } from '@models/factories/inquiryFeedsStats.factory';


@Injectable()
export class AreyoufineService {
    constructor( private API: ApiService) {}

    create(payload: any): Observable<Inquiry> {
        return this.API.Inquiry
            .create(payload)
            .pipe(
                map((inquiry: InquiryDescriptorInterface) => InquiriesFactory.create(inquiry) as Inquiry)
            );
    }

    get(id: string): Observable<Inquiry> {
        return this.API.Inquiry
            .get({id: id})
            .pipe(
                map((inquiry: InquiryDescriptorInterface) => {
                    return InquiriesFactory.create(inquiry) as Inquiry;
                })
            );
    }

    reSend(payload: any): Observable<any> {
        return this.API.Inquiry
            .reSend(payload)
            .pipe(
                map((res) => res)
            );
    }

    fetchAreYouFine(payload: any): Observable<Inquiry[]> {
        payload['type'] = 'areyoufine';
        return this.API.Inquiry
            .fetch(payload)
            .pipe(
                map((inquires: InquiryDescriptorInterface[]) => InquiriesFactory.create(inquires) as Inquiry[])
            );
    }

    fetchInquiryFeeds(payload: any): Observable<InquiryFeed[]> {
        return this.API.Inquiry
            .getFeeds(payload)
            .pipe(
                map((inquiryFeeds: InquiryFeedDescriptorInterface[]) => InquiryFeedsFactory.create(inquiryFeeds) as InquiryFeed[])
            );
    }

    getFeedsStats(id: string): Observable<InquiryFeedStats> {
        return this.API.Inquiry
            .getStats({id: id})
            .pipe(
                map((stats: InquiryFeedStatsDescriptorInterface) => InquiryFeedsStatsFactory.create(stats) as InquiryFeedStats)
            );
    }

    fetchGroups(payload: any): Observable<UserGroup[]> {
        return this.API.UserGroup
            .fetch(payload)
            .pipe(
                map( (groups: UserGroupDescriptorInterface[]) => UserGroupsFactory.create(groups) as UserGroup[])
            );
    }

}
