import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as L from "leaflet";
import {AccommodationLocation} from "../model/location.model";
import {AccommodationUpdateComponent} from "../accommodation/accommodation-update/accommodation-update.component";
import {marker} from "leaflet";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = 'https://nominatim.openstreetmap.org';
  private map: any;
  private marker: any;
  private selectedLocation: AccommodationLocation

  undefinedBasicLocation = new AccommodationLocation( "Somewhere in middle of ocean", 38.556757147352215,  10.67667161616384)

  constructor(private http: HttpClient) {this.selectedLocation=this.undefinedBasicLocation;}

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

  search(street: string): Observable<any> {
    const url = `${this.baseUrl}/search?format=json&q=${street}`;
    return this.http.get(url);
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&<params>`;
    return this.http.get(url);
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

    this.reverseSearch(lat, lng).subscribe((res) => {
      const address = res.display_name;

      // Display address in a popup on the marker
      this.marker.bindPopup(address).openPopup();
      this.selectedLocation = new AccommodationLocation(address, lat, lng);
    });
  }

  searchLocation(address: string): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.search(address).subscribe({
      next: (result) => {
        if (result && result.length > 0) {
          const lat = result[0].lat;
          const lon = result[0].lon;

          // Center the map to the searched location
          this.map.panTo(new L.LatLng(lat, lon));

          // Add a new marker at the searched location
          this.marker = new L.Marker([lat, lon]).addTo(this.map);
        }
      },
      error: (err) => {
        console.error('Error searching location:', err);
      },
    });
  }

  InitAfterViewCreation(): void {
    console.log('ngAfterViewInit called.');

    setTimeout(() => {
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      });
      this.initMap();
    }, 100); // You can adjust the delay (in milliseconds) if needed
  }

  getSelectedLocation(){
    return this.selectedLocation;
  }

  setSelectedLocation(selectedLocation: AccommodationLocation){
      this.selectedLocation = selectedLocation;
  }

}
