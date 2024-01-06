import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review.model";

@Injectable({
  providedIn: 'root',
})

export class ReviewService{
  private apiUrl='http://localhost:8080/api/reviews';
  constructor(private http:HttpClient) {}
  createReview(review:Review):Observable<Review>{
    const url=`${this.apiUrl}`;
    return this.http.post<Review>(url, review);
  }
  updateReview(id:number,review:Review):Observable<Review>{
    const url=`${this.apiUrl}/reviews/${id}`;
    return this.http.put<Review>(url, review);
  }

  deleteOwnerReview(id: number | null): Observable<string> {
    const url = `${this.apiUrl}/owner/${id}`;
    return this.http.delete<string>(url);
  }
  deleteAccommodationReview(id: number | null): Observable<string> {
    const url = `${this.apiUrl}/accommodation/${id}`;
    return this.http.delete<string>(url);
  }
  getAllReviews(): Observable<Review[]> {
    const url = `${this.apiUrl}/reviews`;
    return this.http.get<Review[]>(url);
  }

  getReviewById(id: number): Observable<Review> {
    const url = `${this.apiUrl}/reviews/${id}`;
    return this.http.get<Review>(url);
  }

  getOwnerAverageGrade(email: string): Observable<number>{
    const url = `${this.apiUrl}/averageGrade/owner/${email}`;
    return this.http.get<number>(url)
  }

  getAccommodationAverageGrade(id: number): Observable<number>{
    const url = `${this.apiUrl}/averageGrade/accommodation/${id}`;
    return this.http.get<number>(url)
  }

  getAllAuthorReviewsOwner(authorEmail:string): Observable<Review[]>{
    const url = `${this.apiUrl}/authorReviews/owners/${authorEmail}`;
    return this.http.get<Review[]>(url);
  }
  getAllAuthorReviewsAccommodation(authorEmail:string): Observable<Review[]>{
    const url = `${this.apiUrl}/authorReviews/accommodations/${authorEmail}`;
    return this.http.get<Review[]>(url);
  }

}
