import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {Accommodation} from "../model/accommodation.model";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn:'root',
})

export class AccommodationService{

  private apiUrl = 'http://localhost:8080/api/accommodations';
  constructor(private http: HttpClient, private router:Router) {}

  getAccommodationById(id: number): Observable<Accommodation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Accommodation>(url).pipe(
        tap(data => console.log('Response data:', data)), // Log successful responses
        catchError(this.handleError) // Log and handle errors
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  openUpdatePage(accommodationId:number){
    this.router.navigate(['/accommodation-update',accommodationId]);
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

  getPendingAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/pending`);
  }

  approveAccommodation(accommodationId: number|undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${accommodationId}`, {});
  }

  denyAccommodation(accommodationId: number|undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/deny/${accommodationId}`, {});
  }

}
