import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation} from "../model/reservation.model";

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getReservationById(id: number): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations/${id}`;
    return this.http.get<Reservation>(url);
  }


  getAllReservations(): Observable<Reservation[]> {
    const url = `${this.apiUrl}/reservations`;
    return this.http.get<Reservation[]>(url);
  }

  getGuestReservations(email: string): Observable<Reservation[]> {
    const url = `${this.apiUrl}/reservations/guest/${email}`;
    return this.http.get<Reservation[]>(url);
  }

  getAllAccommodationReservations(accommodationID: number): Observable<Reservation[]> {
    const url = `${this.apiUrl}/reservations/accommodation/${accommodationID}`;
    return this.http.get<Reservation[]>(url);
  }

  deleteReservation(id: number): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations/${id}`;
    return this.http.delete<Reservation>(url);
  }

  createReservation(dto: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations`;
    return this.http.post<Reservation>(url, dto);
  }
}
