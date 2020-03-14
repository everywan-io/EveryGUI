import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as d3 from 'd3';
import { TitleService } from '@services/title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-audit-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class AuditViewComponent implements OnInit, AfterViewInit {

    @ViewChild('containerPieChart') element: ElementRef;

    audit;
    htmlElement: HTMLElement;
    pieData: any;

    showPieChart: boolean;

    width = 200;
    height = 230;
    margin = 40;
    radius;
    svg;
    legendG;
    color;
    pie;
    dataReady;


    constructor(private route: ActivatedRoute,
                private title: TitleService,
                private translator: TranslateService, ) {}

    @HostListener('window:resize')
    onWindowResize() {
        if (this.svg) {
            this.clearAll();
            this.draw();
        }
    }

    ngOnInit() {
        this.title.set('layout.titles.dashboard');
        this.audit = this.route.snapshot.data['audit'];

        this.pieData = [
            {
                name: this.translator.instant('audit.view.notices'),
                count: this.audit.notices.sent
            },
            {
                name: this.translator.instant('audit.view.geoclaim'),
                count: this.audit.inquiry.geoclaim.sent
            },
            {
                name: this.translator.instant('audit.view.areyoufine'),
                count: this.audit.inquiry.areyoufine.sent
            }
        ];

        this.showPieChart = !(this.pieData[0].count === 0 &&
                              this.pieData[1].count === 0 &&
                              this.pieData[2].count === 0);

    }

    ngAfterViewInit() {
        if (this.showPieChart) {
            this.draw();
        }
    }

    private draw() {

        this.htmlElement = this.element.nativeElement;

        this.radius = Math.min(this.width, this.height) / 2 - this.margin;
        this.svg = d3.select(this.htmlElement)
            .append('svg')
            .attr('width', '100%' )
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + (this.htmlElement.offsetWidth / 2 - 78 ) + ',' +
                (this.htmlElement.offsetHeight / 2 + 10 ) + ')');

        // set the color scale
        this.color = d3.scaleOrdinal()
            .domain(Object.keys(this.pieData))
            .range(d3.schemeDark2);

        // Compute the position of each group on the pie:
        this.pie = d3.pie()
            .value((d) => d.value.count );

        this.dataReady = this.pie(d3.entries(this.pieData));
        
        this.svg
            .selectAll('whatever')
            .data(this.dataReady)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(100)         // This is the size of the donut hole
                .outerRadius(this.radius))
            .attr('fill', (d) => (this.color(d.data.key)) )
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .style('opacity', 0.7);

        this.legendG = this.svg
            .selectAll('.legend')
            .data(this.dataReady)
            .enter()
            .append('g')
            .attr('transform', (d, i) => {
                return 'translate(' + (130) + ',' + (i * 30 + 20 - 70) + ')';
            });


        this.legendG
            .append('circle')
            .attr('fill', (d) => (this.color(d.data.key)))
            .attr('r', 8);

        this.legendG
            .append('text')
            .text((d) => {
                return (d.data.value.name + ': ' + d.data.value.count);
            })
            .style('font-size', 16)
            .attr('y', 5)
            .attr('x', 20);

    }

    private clearAll(): void {
        if (this.svg) {
            d3.select('svg').remove();
        }
    }
}
