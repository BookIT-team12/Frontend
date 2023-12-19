import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

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

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
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
}
