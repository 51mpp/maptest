import { Component, OnInit, PLATFORM_ID, Inject ,AfterViewInit} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let L: any;
// import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit ,AfterViewInit{

  private map: any;
  private centroid: L.LatLngExpression = [16.81897, 10.16579]; // Example centroid coordinates

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private initMaps(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</acd >'
    });

    const osmhot = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    osm.addTo(this.map);
    // osmhot.addTo(this.map);
    this.map.flyTo([13.7506, 100.7943], 8)
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((module) => {
        const L = module.default;
        this.initMap(L);
      }).catch((error) => {
        console.error('Error loading Leaflet', error);
      });
    }
  }
  ngAfterViewInit(): void {
  }
  private initMap(L: any): void {
    this.map = L.map('map', {
      center:[13.7506, 100.7943],
      zoom: 12,
    });

    // Add any other Leaflet configurations or layers here
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const osmhot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    osmhot.addTo(this.map);
  }
}
