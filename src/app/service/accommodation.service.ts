import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../model/accommodation.model";

@Injectable({
  providedIn:'root',
})

export class AccommodationService{

  private apiUrl = 'http://localhost:8080/api/accommodations';
  constructor(private http: HttpClient) {}

  getAccommodationById(id: number): Observable<Accommodation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Accommodation>(url);
  }

  getAllAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.apiUrl);
  }

  getOwnerAccommodations(ownerEmail:string):Observable<Accommodation[]>{
    return this.http.get<Accommodation[]>(this.apiUrl);
  }

  createAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(this.apiUrl, accommodation);
  }

  updateAccommodation(id: number, accommodation: Accommodation): Observable<Accommodation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Accommodation>(url, accommodation);
  }

  deleteAccommodation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
