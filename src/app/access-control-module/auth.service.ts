import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError} from "rxjs/operators";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
export const environment = {
  apiHost: 'http://localhost:8080/'
}
export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  //user$ = new BehaviorSubject(this.getRole());
  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();


  userAccount$=new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private userService:UserService) {
    this.user$.next(this.getRole());
    this.setUser();
    this.setUserDetails();

  }

  getRoleObservable(): Observable<string> {
    return this.userState;
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + 'users/login', auth);
  }

  logout(): Observable<string> {
    return this.http.get(environment.apiHost + 'users/login', {
      responseType: 'text',
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      try {
        const accessToken: any = localStorage.getItem('user');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(accessToken);
        console.log(decodedToken)

        return decodedToken ? decodedToken.role : null;
      }
      catch (error) {
        alert("Error decoding token");
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  getCurrentUser(): Observable<User | null> {
    const accessToken = localStorage.getItem('user');
    if (!accessToken) {
      return of(null);
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);

    if (!decodedToken || !decodedToken.sub) {
      return of(null);
    }

    const userId = decodedToken.sub;
    console.log("User ID: ", userId);
    //return userId;
    if (!userId) {
      console.error('User ID not available in the decoded token');
      return of(null);
    }
    const allUsers$ = this.userService.getAllUsers();

    // Use RxJS map operator to transform the result
    return allUsers$.pipe(
      map(users => {
        users.forEach(user=>console.log(user));

        // Find the user with the matching ID
        const currentUser = users.find(user => user.email === userId);

        // Return the found user or null if not found
        return currentUser || null;
      }),

      catchError(error => {
        console.error('Error fetching user info---> getCurrentUser()', error);
        return of(null);
      })
    );
  }


  setUserDetails(): void {
    this.getCurrentUser().subscribe(user => {
      this.userAccount$.next(user);
    });
  }
}
