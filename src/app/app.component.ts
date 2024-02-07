import { Component} from '@angular/core';
import { MapComponent } from './map/map.component';
import { BrowserModule } from '@angular/platform-browser';
import { MapModule } from './map/map.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-leaflet-example';
}
