import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Operator, OperatorRoles } from '@models/operators.model';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { OperatorsService } from '@modules/operators/operators.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '@services/title.service';

@Component({
  selector: 'app-operators-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    readonly OperatorRoles = OperatorRoles;

    operator: Operator;

    timestamp = Date.now();

    form: FormGroup;

    imageURL: string;

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private operators: OperatorsService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private title: TitleService) {

        this.button = {
            state: ButtonStates.ACTIVE,
            title: 'operators.details.actions.edit'
        };
    }


    ngOnInit() {
        this.imageURL = this.route.snapshot.data['operator'].avatar + '?t=' + this.timestamp;
        this.operator = this.route.snapshot.data['operator'];
        this.form = this.defineForm();
        this.title.set('operators.details.title');
    }

    private defineForm(): FormGroup {

        const initialFormValues = {
            id: this.operator.id,
            name: this.operator.name,
            surname: this.operator.surname,
            role: this.operator.role,
            phone: this.operator.phone.readable,
            email: this.operator.email,
        };

        const formGroup = new FormGroup({
            phone: new FormControl({value: initialFormValues.phone, disabled: true}),
            avatar: new FormControl(null, []),
            name: new FormControl({value: initialFormValues.name, disabled: true}),
            surname: new FormControl({value: initialFormValues.surname, disabled: true}),
            role: new FormControl({value: initialFormValues.role, disabled: true}),
            email: new FormControl({value: initialFormValues.email, disabled: true}),
        });

        return formGroup;
    }

}
