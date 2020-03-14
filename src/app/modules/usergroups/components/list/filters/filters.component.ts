import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponsiveState } from 'ngx-responsive';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '@services/title.service';
import { debounceTime } from 'rxjs/operators';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
  selector: 'app-user-groups-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    filters: {
        subject: Subject<FilterStreamInterface>,
        data: { [key: string]: string  }
        visible: boolean;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    public model: any;

    constructor( private device: ResponsiveState,
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

        this.title.set('userGroups.list.title');

    }
    ngOnInit() {

        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
                this.filtersChange.emit(params);
            });

        this.filters.subject.pipe(debounceTime(300)).subscribe((filter: FilterStreamInterface) => {
            this.filters.data[filter.key] = filter.value;

            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: this.filters.data
            });

            this.title.set('userGroups.list.title');

        });
    }

}
