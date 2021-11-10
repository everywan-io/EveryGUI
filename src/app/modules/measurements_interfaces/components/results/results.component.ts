import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


import { merge } from 'rxjs';

import { Measurement } from '@models/measurement.model';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { CustomValidators } from '@everyup/validators/custom.validators';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { MeasurementsService } from '@modules/measurements_interfaces/measurements_interfaces.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';
import { BreadcrumbService } from '@everywan/services/breadcrumb.service';



@Component({
    selector: 'app-devices-details',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    measurement: Measurement;


    constructor(
        private measurements: MeasurementsService,
        private notifications: NotificationsService,
        private translator: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumb: BreadcrumbService,
        private title: TitleService) {


    }

    ngOnInit() {

        this.measurement = this.route.snapshot.data['measurement'];

        this.title.set(`measurements.results.title`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/measurementsessions',
                label: 'Measurement Sessions'
            },
            {
                label: 'Results'
            }
        ]);

    }

    onSubmit() {

    }


}
