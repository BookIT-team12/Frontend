import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../model/user.model";

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

  registerUser(dto: User): Observable<User> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, dto).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(email: string): Observable<User> {
    const url = `${this.apiUrl}/${email}`;
    return this.http.delete<User>(url).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

  getUser(email: string): Observable<User> {
    const url = `${this.apiUrl}/${email}`;
    return this.http.get<User>(url).pipe(
      catchError((error) => {
        console.error('Error getting user:', error);
        return throwError(error);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<User[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting all users:', error);
        return throwError(error);
      })
    );
  }
}
