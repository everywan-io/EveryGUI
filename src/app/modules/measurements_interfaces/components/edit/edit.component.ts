import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
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
    selector: 'app-devices-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


    form: FormGroup;
    formErrorMessage: string;
    measurement: Measurement;
    interfaceTypes = [
        { title: 'Unknown', value: 'unknown' },
        { title: 'LAN', value: 'lan' },
        { title: 'WAN', value: 'wan' }];
    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(
        private measurements: MeasurementsService,
        private notifications: NotificationsService,
        private translator: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumb: BreadcrumbService,
        private title: TitleService) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'devices.edit.actions.create'
        };

    }

    ngOnInit() {

        this.measurement = this.route.snapshot.data['measurement'];



        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `measurements.edit.actions.edit`;



        merge(
            this.form.get('submitted').valueChanges,
            this.form.statusChanges
        ).subscribe(() => {
            this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        });

        this.title.set(`measurements.edit.title.edit`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/measurements',
                label: 'Measurement Sessions'
            },
            {
                label: 'Configure'
            }
        ]);

    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            this.form.updateValueAndValidity();
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        const payload = {
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            // interfaces: this.form.get('interfaces').value,
            id: this.form.get('id').value,
        };
    }
}
