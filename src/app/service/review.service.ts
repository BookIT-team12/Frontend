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
    const url=`${this.apiUrl}/reviews`;
    return this.http.post<Review>(url, review);
  }
  updateReview(id:number,review:Review):Observable<Review>{
    const url=`${this.apiUrl}/reviews/${id}`;
    return this.http.put<Review>(url, review);
  }
  deleteReview(id: number): Observable<string> {
    const url = `${this.apiUrl}/reviews/${id}`;
    return this.http.delete<string>(url);
  }
  getAllReviews(): Observable<Review[]> {
    const url = `${this.apiUrl}/reviews`;
    return this.http.get<Review[]>(url);
  }

  getReviewById(id: number): Observable<Review> {
    const url = `${this.apiUrl}/reviews/${id}`;
    return this.http.get<Review>(url);
  }}
