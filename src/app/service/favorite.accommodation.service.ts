import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from '../model/accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl = 'https://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(userId: string, accommodationId: number): Observable<any> {
    const url = `${this.baseUrl}/add`;
    let body:HttpParams = new HttpParams();
    body = body.set('userId', userId);
    body = body.set('accommodationId', accommodationId);
    console.log("TRY ADDING");
    return this.http.post(url, body);
  }

  removeFavorite(userId: string, accommodationId: number): Observable<any> {
    const url = `${this.baseUrl}/remove`;
    const options = {
      headers: { 'Content-Type': 'application/json' },
      body: { userId, accommodationId },
    };
    console.log("TRY REMOVING");
    return this.http.delete(url, options);
  }

  getUserFavorites(userId: string): Observable<Accommodation[]> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<Accommodation[]>(url);
  }

  isFavorite(userEmail: string, accommodationId: number): Observable<boolean> {
    const url = `${this.baseUrl}/isFavorite`; // Align with the backend endpoint
    return this.http.get<boolean>(url, {
      params: { userEmail, accommodationId: accommodationId.toString() },
    });
  }
}
