import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private centroid: L.LatLngExpression = [16.81897, 10.16579]; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((module) => {
        const L = module.default;
        this.initMap(L);
      }).catch((error) => {
        console.error('Error loading Leaflet', error);
      });
    }
  }

  private initMap(L: any): void {
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const osmhot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const osmtopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  
    this.map = L.map('map', {
      center: [13.7506, 100.7943],
      zoom: 12,
      layers: [osm, osmhot]
    });
  
    var baseMaps = {
      "OpenStreetMap": osm,
      "OpenStreetMap.HOT": osmhot
    };
    var layerControl = L.control.layers(baseMaps).addTo(this.map);
    layerControl.addBaseLayer(osmtopo, "OpenTopoMap");
  
    this.map.on('click', (event: any) => {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log('Latitude:', latitude, 'Longitude:', longitude);
    });
  }
  
}
