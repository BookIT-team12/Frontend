import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  updateUser(dto: User): Observable<User> {
    const url = `${this.apiUrl}/${dto.email}`;
    return this.http.post<User>(url, dto);
  }

  registerUser(dto:User):Observable<User>{
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, dto);


  }

  deleteUser(email: string): Observable<User> {
    const url = `${this.apiUrl}/${email}`;
    return this.http.delete<User>(url);
  }

  getUser(email: string): Observable<User> {
    const url = `${this.apiUrl}/${email}`;
    return this.http.get<User>(url);
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<User[]>(url);
  }
}
