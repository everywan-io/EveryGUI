import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { merge } from 'rxjs';

import { Device } from '@models/devices.model';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { CustomValidators } from '@everyup/validators/custom.validators';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { DevicesService } from '@modules/devices/devices.service';
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
    device: Device;
    interfaceTypes = [
        { title: 'Unknown', value: 'unknown'},
        { title: 'LAN', value: 'lan' },
        { title: 'WAN', value: 'wan' }];
    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private devices: DevicesService,
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

        this.device = this.route.snapshot.data['device'];
        
        this.form = this.defineForm();

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `devices.edit.actions.edit`;

        this.route.data.subscribe((data: Data) => this.form = this.defineForm());

        merge(
            this.form.get('submitted').valueChanges,
            this.form.statusChanges
        ).subscribe(() => {
            this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        });

        this.title.set(`devices.edit.title.edit`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/devices',
                label: 'EveryEdges'
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
        const interfaces = this.form.get('interfaces').value;

        const interfaces_json = [];
        interfaces.forEach(val => interfaces_json.push(Object.assign({}, val)));

        for (const i in interfaces_json) {
            if (interfaces_json.hasOwnProperty(i)) {
                if (interfaces_json[i]['ipv4_addrs'] && interfaces_json[i]['ipv4_addrs'] !== '') {
                    interfaces_json[i]['ipv4_addrs'] = String(interfaces_json[i]['ipv4_addrs']).split(',');
                }
               
                if (interfaces_json[i]['ipv4_subnets'] && interfaces_json[i]['ipv4_subnets'] !== '') {
                    interfaces_json[i]['ipv4_subnets'] = JSON.parse(interfaces_json[i]['ipv4_subnets']);
                }

                if (interfaces_json[i]['ipv6_addrs'] && interfaces_json[i]['ipv6_addrs'] !== '') {
                    interfaces_json[i]['ipv6_addrs'] = String(interfaces_json[i]['ipv6_addrs']).split(',');
                }
               
                if (interfaces_json[i]['ipv6_subnets'] && interfaces_json[i]['ipv6_subnets'] !== '') {
                    interfaces_json[i]['ipv6_subnets'] = JSON.parse(interfaces_json[i]['ipv6_subnets']);
                }
                
            }
        }

        payload['interfaces'] = interfaces_json;
        this.button.state = ButtonStates.LOADING;
        
        this.devices.configure(payload)
            .subscribe(
                (device_edited: Device) => {
                    this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;

                    this.router.navigate(['/devices']);
                    this.notifications.success(
                        this.translator.instant(`devices.edit.notifications.edit.title`),
                        this.translator.instant(`devices.edit.notifications.edit.message`, { fullname: this.device.id })
                    );
                },
                (error: any) => {
                    this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
                    
                    this.notifications.error(
                        this.translator.instant(`devices.edit.notifications.edit.title`),
                        error.error.error
                    );
                }
            );
    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(): FormGroup {
        const interfaces = new FormArray([]);
        for (const devInt of this.device.interfaces) {
            console.log(Array(devInt['ipv4_subnets']).join())
            console.log(devInt['ipv4_subnets'])
            const interfaceFormGroup = new FormGroup({
                name: new FormControl(devInt['name'], []),
                type: new FormControl({value: devInt['type'], disabled: false}, []),
                ipv4_addrs: new FormControl({value: Array(devInt['ipv4_addrs']).join(), disabled: false}, []),
                ipv6_addrs: new FormControl({value: Array(devInt['ipv6_addrs']).join(), disabled: false}, []),
                ipv4_subnets:  new FormControl({value: JSON.stringify(devInt['ipv4_subnets']), disabled: false}, []),
                ipv6_subnets:  new FormControl({value: JSON.stringify(devInt['ipv6_subnets']), disabled: false}, []),
            });
            interfaceFormGroup.disable();
            interfaces.push(interfaceFormGroup);
          }
        const formGroup = new FormGroup({
            'submitted': new FormControl(false, []),
            'id': new FormControl(this.device.id, []),
            'name': new FormControl({ value: this.device.name, disabled: false }, [Validators.required]),
            'description': new FormControl({ value: this.device.description, disabled: false }, [Validators.required]),
            // 'interfaces': new FormArray({ value: this.device.interfaces, disabled: false}, [])
            'interfaces': interfaces
        });


        return formGroup;
    }

    interfaceIsChecked(event: any, i: any) {
        const interfaces = this.form.get('interfaces') as FormArray;
        if ( event.target.checked ) {
            interfaces.controls[i].enable();
        } else {
            interfaces.controls[i].disable();
        }
        
    }

    interfaceTypeSelected(event: any, i: any) {
        console.log(event.target.value)
        const interfaces = this.form.get('interfaces') as FormArray;
        const control = interfaces.controls[i];
        if (event.target.value === 'wan') {
            control.get('ipv4_addrs').disable();
            control.get('ipv6_addrs').disable();
            control.get('ipv4_subnets').disable();
            control.get('ipv6_subnets').disable();
        } else {
            control.get('ipv4_addrs').enable();
            control.get('ipv6_addrs').enable();
            control.get('ipv4_subnets').enable();
            control.get('ipv6_subnets').enable();
        }
        
    }
}
