import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PaginatorService } from '@modules/shared/services/paginator.service';
import { DatepickerConfig, DatepickerItalianFormatter } from '@configs/datepicker.config';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveState } from 'ngx-responsive';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '@services/title.service';
import { DatesService } from '@services/dates.service';
import * as Moment from 'moment';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
    selector: 'app-signals-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    providers: [
        PaginatorService,
        DatepickerConfig,
        {
            provide: NgbDateParserFormatter,
            useClass: DatepickerItalianFormatter
        }
    ]
})
export class FiltersComponent implements OnInit {

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

    querySearch: string;
    queryFromDate;
    queryToDate;

    constructor(private device: ResponsiveState,
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
              this.querySearch = params.term;

              if (params['from_date']) {
                  this.queryFromDate = DatesService.fromMomentToDateStruct(Moment(params['from_date']));
              }

              if (params['to_date']) {
                  this.queryToDate = DatesService.fromMomentToDateStruct(Moment(params['to_date']));
              }

          });

      this.filters.subject
          .pipe(debounceTime(1000))
          .subscribe((filter: FilterStreamInterface) => {
              if (filter.key.endsWith('date')) {
                  this.filters.data[filter.key] = filter.value
                      ? DatesService.fromDateStructToMoment(filter.value).toISOString()
                      : undefined;
              } else {
                  this.filters.data[filter.key] = filter.value;
              }

              this.router.navigate([], {
                  relativeTo: this.route,
                  queryParams: this.filters.data
              });

              this.title.set('signals.list.title');
          });
  }

    onDateInputFieldKeyPressed(key: string, value: string) {
        if (value.length === 0 || value.length !== 8 || !Moment.utc(value, 'DD/MM/YYYY').isValid()) {
            this.filters.subject.next({key, value: null});
        }
    }

}
