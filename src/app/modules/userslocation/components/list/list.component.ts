import { AfterViewInit, Component, OnInit } from '@angular/core';

import { UserslocationService } from '@modules/userslocation/userslocation.service';
import { UserLocation } from '@models/userLocation.model';
import { UsersStats } from '@models/usersStats.model';
import * as L from 'leaflet';
import { TitleService } from '@services/title.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

    usersStats: UsersStats;
    map;

    constructor(private userslocationService: UserslocationService,
                private title: TitleService) {
        this.usersStats = {
            locations: {
                registered: {
                    amount: null,
                    percentage: null
                },
                unregistered: {
                    amount: null,
                    percentage: null
                }
            }
        };
    }

    ngOnInit() {
        this.userslocationService.fetchStats().subscribe(
            (usersStats: UsersStats) => this.usersStats = usersStats);
        this.title.set('usersLocation.list.title');
    }

    ngAfterViewInit() {
        this.initMap();

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        this.userslocationService.fetchLocations().subscribe(
            (usersLocation: UserLocation[]) => {
                let marker;
                const locations = [];
                usersLocation.forEach(userLocation => {
                    locations.push([userLocation.location.latitude, userLocation.location.longitude]);
                    marker = L.marker([userLocation.location.latitude, userLocation.location.longitude]).addTo(this.map);
                    marker.bindPopup('<b>' + userLocation.fullName + '</b>');
                });
                this.map.fitBounds(locations);
            }
        );

    }

    initMap(): void {
        this.map = L.map('map', {
            // everywan
            center: [ 42.594401, 13.7396474 ],
            zoom: 5,
        });
    }

}
