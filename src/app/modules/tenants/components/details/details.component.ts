import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { Tenant} from '@models/tenants.model';
import {TenantsService} from '@modules/tenants/tenants.service';
import { TitleService } from '@services/title.service';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';
import { DatesService } from '@services/dates.service';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NotificationsService } from '@modules/notifications/notifications.service';
import * as Moment from 'moment';

@Component({
    selector: 'app-tenant-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    tenant: Tenant;
    constructor(private title: TitleService,
        private route: ActivatedRoute,
        private tenantService: TenantsService,
        private modal: NgbModal,
        private translator: TranslateService,
        private router: Router,
        private notifications: NotificationsService,
        private progress: NgProgress) { }

    ngOnInit() {
        this.title.set(`tenants.details.title`);
        this.tenant = this.route.snapshot.data['tenant'];
        console.log(this.tenant)
    }

}
