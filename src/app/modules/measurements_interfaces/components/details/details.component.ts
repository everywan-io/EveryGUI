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
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

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

        this.title.set(`measurements.details.title`);
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
                label: 'Details'
            }
        ]);

        var status = this.measurement.status;

        function controlloIlluminazione() {
            if (status != 'Running' && status != 'running') {
                var elemento = document.getElementById("statusid");
                elemento.id = ("statusidstopped");
            }
        }

        controlloIlluminazione();

        //sezione dedicata all'illuminazione ad intermittenza di 'running'
        /*var counter = 1
        var elementiHeaders = document.getElementsByClassName("router-link-active");
        var elementiMenu = document.getElementsByClassName("title");

        console.log("Attivo illuminazione Running")

        function illumina() {
            if (counter == 1) {
                document.getElementById("statusid").style.color = "rgb(0, 130, 0)";
                counter = 0;
            } else {
                (counter == 0)
                document.getElementById("statusid").style.color = "rgb(0, 194, 0)";
                counter = 1;
            }
        }

        function cambiaColoreStatus() {
            if (window.location.href === "http://localhost:4200/measurementsessions/" + document.getElementById("sessione").innerText + "/details") {
                illumina();
            }
            if (window.location.href === "http://localhost:4200/measurementsessions") {
                var stringa = "Disattivo illuminazione Running";
                console.clear();
                console.log(stringa);
                clearInterval(lampeggia);
            }
        }

        function verificaLampeggiante() {
            for (var i = 0; i < elementiHeaders.length; i++) {
                elementiHeaders[i].addEventListener('click', stopLampeggiante);
                //console.log(elementiHeaders[i]);
            }
            for (var i = 0; i < elementiMenu.length; i++) {
                elementiMenu[i].addEventListener('click', stopLampeggiante);
                //console.log(elementiMenu[i]);
            }
        }

        var lampeggia = setInterval(cambiaColoreStatus, 500);

        function stopLampeggiante() {
            clearInterval(lampeggia);
            console.log("Disattivo illuminazione Running");
        }

        setTimeout(verificaLampeggiante, 1000);*/
    }

    onSubmit() {

    }



}