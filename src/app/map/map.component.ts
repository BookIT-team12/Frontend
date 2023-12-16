// map.component.ts
import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private marker: any;

  constructor(private mapService: MapService, private elementRef:ElementRef) {}

  private initMap(): void {
    console.log('Initializing map...');
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    if (!this.map) {
      console.error('Leaflet map not initialized properly.');
      return;
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map);

    this.map.on('click', (e: any) => this.onMapClick(e));

    // Handle window resize event
    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });

    console.log('Map initialized successfully.');
  }



  onMapClick(e: L.LeafletMouseEvent): void {
    const coord = e.latlng;
    const lat = coord.lat;
    const lng = coord.lng;

    console.log('You clicked the map at latitude: ' + lat + ' and longitude: ' + lng);

    // Remove the previous marker if exists
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Add a new marker at the clicked location
    this.marker = new L.Marker([lat, lng]).addTo(this.map);

    this.mapService.reverseSearch(lat, lng).subscribe((res) => {
      const address = res.display_name;
      console.log(address);

    // Display address in a popup on the marker
    this.marker = new L.Marker([lat, lng])
      .bindPopup(address)
      .addTo(this.map)
      .openPopup();
  });
  }


  searchLocation(address: string): void {
    this.mapService.search(address).subscribe({
      next: (result) => {
        if (result && result.length > 0) {
          const lat = result[0].lat;
          const lon = result[0].lon;

          // Center the map to the searched location
          this.map.panTo(new L.LatLng(lat, lon));

          // Remove the previous marker if exists
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }

          // Add a new marker at the searched location
          this.marker = new L.Marker([lat, lon]).addTo(this.map);
        }
      },
      error: (err) => {
        console.error('Error searching location:', err);
      },
    });
  }


  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called.');

    setTimeout(() => {
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      });
      this.initMap();
    }, 100); // You can adjust the delay (in milliseconds) if needed
  }
}
