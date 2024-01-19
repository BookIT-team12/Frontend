import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from "../model/reservation.model";
import {ReservationDetails} from "../model/reservation-details.model";

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

  getOwnerReservations(email: string): Observable<Reservation[]> {
    const url = `${this.apiUrl}/reservations/owner/${email}`;
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
    console.log("DTO:");
    console.log(dto);
    return this.http.post<Reservation>(url, dto);
  }
  updateReservation(dto: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations`;
    console.log("DTO:");
    console.log(dto);
    return this.http.put<Reservation>(url, dto);
  }

  denyReservation(dto: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations/1`;
    console.log("DTO:");
    console.log(dto);
    return this.http.put<Reservation>(url, dto);
  }
  approveReservation(dto: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations/2`;
    console.log("DTO:");
    console.log(dto);
    return this.http.put<Reservation>(url, dto);
  }
  cancelReservation(dto: Reservation): Observable<Reservation> {
    const url = `${this.apiUrl}/reservations/3`;
    console.log("DTO:");
    console.log(dto);
    return this.http.put<Reservation>(url, dto);
  }
  searchReservations(params:HttpParams): Observable<any> {
    const url = `${this.apiUrl}/reservations/search`;
    return this.http.get<Reservation[]>(url, {params});
  }
}
