import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {Accommodation} from "../model/accommodation.model";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {AccommodationDtoModel} from "../model/accommodation.dto.model";

@Injectable({
  providedIn:'root',
})

export class AccommodationService{

  private apiUrl = 'http://localhost:8080/api/accommodations';
  constructor(private http: HttpClient, private router:Router) {}

  getAccommodationById(id: number): Observable<AccommodationDtoModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AccommodationDtoModel>(url);
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

  createAccommodation(accommodation: Accommodation, images: File[]): Observable<Accommodation> {
    const formData: FormData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('accommodation_images', images[i]);
    }
    formData.append("accommodationDTO", new Blob([JSON.stringify(accommodation)], {type: "application/json"}))
    return this.http.post<Accommodation>(this.apiUrl, formData);
  }

  updateAccommodation(accommodation: Accommodation, images: File[], id: number | undefined): Observable<AccommodationDtoModel> {
    const url = `${this.apiUrl}/${id}`;

    const formData: FormData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('accommodation_images', images[i]);
    }
    formData.append("accommodationDTO", new Blob([JSON.stringify(accommodation)], {type: "application/json"}))

    return this.http.put<AccommodationDtoModel>(url, formData);
  }

  deleteAccommodation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getPendingAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/pending`);
  }

  approveAccommodation(accommodationId: number | undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${accommodationId}`, {});
  }

  denyAccommodation(accommodationId: number | undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/deny/${accommodationId}`, {});
  }

}
