import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';

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
        private measurementService: MeasurementsService,
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

        var arrayDirect = this.measurement.results.delayDirectPath.delays;
        var arrayReturn = this.measurement.results.delayReturnPath.delays;

        /*Parte di codice dedicata all'aggiunta HTML dei
         valori di massimo e di minimo delle sessioni di
         misura "direct" e "return*/

        function calcolaMassimoMinimoDirect() {
            var delayMax = document.getElementById("directDelayMaxValue");
            var delayMin = document.getElementById("directDelayMinValue");
            for (let i in arrayDirect) {
                if (parseInt(i) == 0) {
                    var max = arrayDirect[i].value;
                    var min = arrayDirect[i].value;
                } else {
                    if (arrayDirect[i].value >= max) {
                        max = arrayDirect[i].value;
                    }
                    if (arrayDirect[i].value <= min) {
                        min = arrayDirect[i].value;
                    }
                }
            }
            delayMax.innerHTML = max;
            delayMin.innerHTML = min;
        }

        function calcolaMassimoMinimoReturn() {
            var delayMax = document.getElementById("returnDelayMaxValue");
            var delayMin = document.getElementById("returnDelayMinValue");
            for (let i in arrayReturn) {
                if (parseInt(i) == 0) {
                    var max = arrayReturn[i].value;
                    var min = arrayReturn[i].value;
                } else {
                    if (arrayReturn[i].value >= max) {
                        max = arrayReturn[i].value;
                    }
                    if (arrayReturn[i].value <= min) {
                        min = arrayReturn[i].value;
                    }
                }
            }
            delayMax.innerHTML = max;
            delayMin.innerHTML = min;
        }

        calcolaMassimoMinimoDirect();
        calcolaMassimoMinimoReturn();

        /*Parte di codice dedicata al grafico delle tabelle*/
        function generaGraficoDirectPath() {
            var canvasCast = <HTMLCanvasElement>document.getElementById("myCanvasDirect");
            var myCanvasDirect = canvasCast.getContext("2d");

            var arrayAsseX = [];
            var arrayAsseY = [];

            for (let i in arrayDirect) {
                arrayAsseX.push(arrayDirect[i].id);
            }

            for (let i in arrayDirect) {
                arrayAsseY.push(arrayDirect[i].value);
            }

            Chart.defaults.global.defaultFontFamily = 'lato';
            Chart.defaults.global.defaultFontSize = 15;
            Chart.defaults.global.defaultFontColor = '#5a5757';

            var chart = new Chart(myCanvasDirect, {
                type: 'line',
                data: {
                    labels: arrayAsseX,
                    datasets: [{
                        label: "Valore di Ritardo",
                        data: arrayAsseY,
                        borderColor: 'blue'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Measurements sessions's Direct Delay Table Graph",
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'start'
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 50,
                            bottom: 50
                        }
                    },
                    elements: {
                        point: {
                            pointStyle: 'circle',
                            radius: 5,
                            backgroundColor: 'blue'
                        }
                    }
                },
            });
        }

        function generaGraficoReturnPath() {
            var canvasCast = <HTMLCanvasElement>document.getElementById("myCanvasReturn");
            var myCanvasReturn = canvasCast.getContext("2d");

            var arrayAsseX = [];
            var arrayAsseY = [];

            for (let i in arrayReturn) {
                arrayAsseX.push(arrayReturn[i].id);
            }

            for (let i in arrayReturn) {
                arrayAsseY.push(arrayReturn[i].value);
            }

            Chart.defaults.global.defaultFontFamily = 'lato';
            Chart.defaults.global.defaultFontSize = 15;
            Chart.defaults.global.defaultFontColor = '#5a5757';

            var chart = new Chart(myCanvasReturn, {
                type: 'line',
                data: {
                    labels: arrayAsseX,
                    datasets: [{
                        label: "Valore di Ritardo",
                        data: arrayAsseY,
                        borderColor: 'blue'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Measurements sessions's Return Delay Table Graph",
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'start'
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 50,
                            bottom: 50
                        }
                    },
                    elements: {
                        point: {
                            pointStyle: 'circle',
                            radius: 5,
                            backgroundColor: 'blue'
                        }
                    }
                },
            });
        }

        generaGraficoDirectPath();
        generaGraficoReturnPath();

        /*Parte di codice dedicata al bottone per il
         download dei dati delle tabelle */

        function scarica() {
            var button = document.getElementById("bottone");
            button.addEventListener('click', downloadDocument);
        }

        var session = this.measurement.sessionId;
        var mediaDirect = this.measurement.results.delayDirectPath.averageDelay;
        var mediaReturn = this.measurement.results.delayReturnPath.averageDelay;
        var sidlist = this.measurement.sidlist;
        var returnSidlist = this.measurement.returnSidlist;

        var fileSidlist = function preparaSidlist() {
            for (var i = 0; i < sidlist.length; i++) {
                if (i == 0) {
                    var stringaProvvisoria = '"' + sidlist[i] + '",\n\t\t';
                    var stringaFinale = stringaProvvisoria;
                } else {
                    if (i > 0 && i < sidlist.length - 1) {
                        var stringaProvvisoria = '"' + sidlist[i] + '",\n\t\t';
                        stringaFinale = stringaFinale + stringaProvvisoria;
                    }
                    else {
                        var stringaProvvisoria = '"' + sidlist[i] + '"\n\t\t';
                        stringaFinale = stringaFinale + stringaProvvisoria;
                    }
                }
            }
            return stringaFinale;
        }

        var fileReturnSidlist = function preparaSidlist() {
            for (var i = 0; i < returnSidlist.length; i++) {
                if (i == 0) {
                    var stringaProvvisoria = '"' + returnSidlist[i] + '",\n\t\t';
                    var stringaFinale = stringaProvvisoria;
                } else {
                    if (i > 0 && i < returnSidlist.length - 1) {
                        var stringaProvvisoria = '"' + returnSidlist[i] + '",\n\t\t';
                        stringaFinale = stringaFinale + stringaProvvisoria;
                    }
                    else {
                        var stringaProvvisoria = '"' + returnSidlist[i] + '"\n\t\t';
                        stringaFinale = stringaFinale + stringaProvvisoria;
                    }
                }
            }
            return stringaFinale;
        }

        var fileJsonDirect = function preparaStringa() {
            for (let i in arrayDirect) {
                var stringaProvvisoria = '{\n\t\t"id" : "' + arrayDirect[i].id + '",\n\t\t' + '"timestamp" : "' + arrayDirect[i].timestamp + '",\n\t\t' + '"value" : "' + arrayDirect[i].value + '"\n\t\t},\n\t\t';
                if (parseInt(i) == 0) {
                    var stringaFinale = stringaProvvisoria;
                } else {
                    stringaFinale = stringaFinale + stringaProvvisoria;
                }
            }
            return stringaFinale;
        }

        var fileJsonReturn = function preparaStringa() {
            for (let i in arrayReturn) {
                var stringaProvvisoria = '{\n\t\t"id" : "' + arrayReturn[i].id + '",\n\t\t' + '"timestamp" : "' + arrayReturn[i].timestamp + '",\n\t\t' + '"value" : "' + arrayReturn[i].value + '"\n\t\t},\n\t\t';
                if (parseInt(i) == 0) {
                    var stringaFinale = stringaProvvisoria;
                } else {
                    stringaFinale = stringaFinale + stringaProvvisoria;
                }
            }
            return stringaFinale;
        }

        function downloadDocument() {
            const data = '[{\n"sessionId" : "' + session + '",\n"delayDirectPath" : {\n\t"delays" : [\n\t\t' + fileJsonDirect() + '\n\t],\n\t"averageDelay" : "' + mediaDirect + '",\n\t"maxValue" : "' + document.getElementById("directDelayMaxValue").innerHTML + '",\n\t"minValue" : "' + document.getElementById("directDelayMinValue").innerHTML + '",\n\t"sidlist" : [\n\t\t' + fileSidlist() + ']\n\t},\n"delayReturnPath" : {\n\t"delays" : [\n\t\t' + fileJsonReturn() + '\n\t],\n\t"averageDelay" : "' + mediaReturn + '",\n\t"maxValue" : "' + document.getElementById("returnDelayMaxValue").innerHTML + '",\n\t"minValue" : "' + document.getElementById("returnDelayMinValue").innerHTML + '",\n\t"sidlist" : [\n\t\t' + fileReturnSidlist() + ']\n\t}\n}]';
            const blob = new Blob([data], { type: "json" });

            const href = URL.createObjectURL(blob);

            const a = Object.assign(document.createElement("a"), {
                href,
                style: "display:none",
                download: "TabelleMeasurementSessions.json"
            });

            a.click();
            URL.revokeObjectURL(href);
            a.remove();
        }

        setTimeout(scarica, 1000);

    }

    onSubmit() {

    }

}
