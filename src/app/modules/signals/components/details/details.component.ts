import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Signal } from '@models/signals.model';
import { TitleService } from '@services/title.service';
import { TranslateService } from '@ngx-translate/core';
import { ButtonStates } from '@modules/shared/components/button/button.component';

@Component({
  selector: 'app-signal-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    signal: Signal;
    timestamp = Date.now();

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private route: ActivatedRoute,
                private title: TitleService,
                private translator: TranslateService) {

        this.button = {
            state: ButtonStates.ACTIVE,
            title: 'signals.details.actions.sendResponse'
        };

    }

    ngOnInit() {
        this.signal = this.route.snapshot.data['signal'];
        this.title.set(this.translator.instant('signals.details.title'));
    }

}
