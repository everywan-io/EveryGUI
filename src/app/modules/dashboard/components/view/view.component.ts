import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as d3 from 'd3';
import { TitleService } from '@services/title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class DashboardViewComponent implements OnInit, AfterViewInit {


    dashboard;

    


    constructor(private route: ActivatedRoute,
                private title: TitleService,
                private translator: TranslateService, ) {}



    ngOnInit() {
        this.title.set('layout.titles.dashboard');
        this.dashboard = this.route.snapshot.data['dashboard'];

        

    }

    ngAfterViewInit() {
       
    }


}
