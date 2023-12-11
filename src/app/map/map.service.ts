import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = 'https://nominatim.openstreetmap.org';

  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    const url = `${this.baseUrl}/search?format=json&q=${street}`;
    return this.http.get(url);
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&<params>`;
    return this.http.get(url);
  }
}
