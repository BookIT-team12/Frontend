import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../model/accommodation.model";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn:'root',
})

export class AccommodationService{

  private apiUrl = 'http://localhost:8080/api/accommodations';
  constructor(private http: HttpClient, private router:Router) {}

  getAccommodationById(id: number): Observable<Accommodation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Accommodation>(url);
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

  updateAccommodation(id: number | undefined, accommodation: Accommodation): Observable<Accommodation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Accommodation>(url, accommodation);
  }

  deleteAccommodation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
