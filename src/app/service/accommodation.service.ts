import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {Accommodation} from "../model/accommodation.model";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {AccommodationResponseModel} from "../model/accommodation.response.model";

@Injectable({
  providedIn:'root',
})

export class AccommodationService{

  private apiUrl = 'http://localhost:8080/api/accommodations';
  constructor(private http: HttpClient, private router:Router) {}

  getAccommodationById(id: number): Observable<AccommodationResponseModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AccommodationResponseModel>(url);
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

  updateAccommodation(accommodation: Accommodation, images: File[], id: number | undefined): Observable<AccommodationResponseModel> {
    const url = `${this.apiUrl}/${id}`;

    const formData: FormData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('accommodation_images', images[i]);
    }
    formData.append("accommodationDTO", new Blob([JSON.stringify(accommodation)], {type: "application/json"}))

    return this.http.put<AccommodationResponseModel>(url, formData);
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

  getFilteredAccommodation(params:HttpParams):Observable<any>{
    return this.http.get<Accommodation[]>(this.apiUrl + '/filter',{params});
  }

  //get favorite accommodations
  getFavoriteAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/favorites`);
  }

  //todo:add a fav accommodation (kada Uros zavrsi main page-->dodati onClick pozivanje funkcije)

}
