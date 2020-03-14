import {Component, Input, EventEmitter, OnInit, Output, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveState} from 'ngx-responsive';

import {Device} from '@models/devices.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Interface } from '@everywan/models/interfaces.model';
import { InterfaceType } from '@everywan/configs/network/api.descriptors';


@Component({
    selector: 'app-dev-int-card',
    templateUrl: './interfacecard.component.html',
    styleUrls: ['./interfacecard.component.scss'],
    providers: [
    ]
})

export class DevIntCardComponent implements OnInit {
    @Output() interfaceChange: EventEmitter<any>;
    device: Device;
    interface: Interface;

    // @ViewChild('selectInterface') selectInterface: ElementRef;

    @Input()
    set dev(device: Device) {
        this.device = device;
    }

    @Input()
    set devInterface(devInterface: Interface) {
        this.interface = devInterface;
    }
 
    constructor(
                private translator: TranslateService,
                private overlaynet: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private renderer: Renderer2) {

        this.interfaceChange = new EventEmitter<any>();

    }

    ngOnInit() {}

    isChecked(event: any) {
        if ( event.target.checked ) {
            this.interfaceChange.emit({action: 'upsert', interface: this.interface.name, deviceId: this.interface.deviceid});
        } else {
            this.interfaceChange.emit({action: 'remove', interface: this.interface.name, deviceId: this.interface.deviceid});
        }
        
    }

/*     selectedInterface(value: string) {
        if (value !== undefined && value !== '') {
            this.interfaceChange.emit({action: 'upsert', deviceId: this.device.id, interface: value});
        }
        
    } */

}
