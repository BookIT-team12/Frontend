import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {Role, User} from "../model/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';



  constructor(private http: HttpClient) {}

  updateUser(dto: User): Observable<User> {
    const url = `${this.apiUrl}/${dto.email}`;
    return this.http.post<User>(url, dto).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  registerUser(user: User, recaptchaToken: string): Observable<User> {
    const url = `${this.apiUrl}/register`;

    // Construct request parameters
    const params = new HttpParams()
      .set('recaptchaToken', recaptchaToken);

    return this.http.post<User>(url, user, { params }).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(email: string): Observable<any> {
    const url = `${this.apiUrl}/${email}`;

    return this.http.delete(url, { observe: 'response' }).pipe(
      map(response => response.body),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError('An error occurred. Please try again later.');
  }

  getUser(email: string): Observable<User> {
    const url = `${this.apiUrl}/${email}`;
    //{withCredentials:true}
    return this.http.get<User>(url).pipe(
      catchError((error) => {
        console.error('Error getting user:', error);
        return throwError(error);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}`;
    //, {withCredentials:true}
    return this.http.get<User[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting all users:', error);
        return throwError(error);
      })
    );
  }

  getReportedUsers():Observable<User[]>{
    const url = `${this.apiUrl}/reported`;
    return this.http.get<User[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting all users:', error);
        return throwError(error);
      })
    );

  }

  reportUser(reportedID: string): Observable<any> {
    const url = `${this.apiUrl}/report?reportedID=${reportedID}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, null, { headers, responseType: 'text' }).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  getReportableUsers(userID: string): Observable<User[]> {
    const url = `${this.apiUrl}/reportable?userID=${userID}`;
    return this.http.get<User[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting reportable users:', error);
        return throwError(error);
      })
    );
  }

  getUsersforBlocking(): Observable<User[]> {
    const url = `${this.apiUrl}/block`;
    return this.http.get<User[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting blocking users:', error);
        return throwError(error);
      })
    );
  }


  blockUser(userID: string): Observable<any> {
    const url = `${this.apiUrl}/blocked?userID=${userID}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, null, { headers, responseType: 'text' }).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

}
