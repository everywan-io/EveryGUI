import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { ResponsiveState } from 'ngx-responsive';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '@services/title.service';


interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
    selector: 'app-categories-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class FilterComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    filters: {
        subject: Subject<FilterStreamInterface>,
        data: { [key: string]: string }
        visible: boolean;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    queryTerm: string;

    constructor(private device: ResponsiveState,
                private translator: TranslateService,
                private route: ActivatedRoute,
                private router: Router,
                private title: TitleService) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();

        this.filters = {
            subject: new Subject<FilterStreamInterface>(),
            data: {},
            visible: !device.isMobile()
        };

        this.loading = {
            term: false
        };

    }

    ngOnInit() {

        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);
                this.queryTerm = params.term;
            });

        this.filters.subject
            .pipe(debounceTime(1000))
            .subscribe((filter: FilterStreamInterface) => {
                this.filters.data[filter.key] = filter.value;

                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: this.filters.data
                });

                this.title.set('categories.list.title');
            });
    }

}
