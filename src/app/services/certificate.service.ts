import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Certificate} from "../model/certificate";
import {UserService} from "./user.service";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})

export class CertificateService {
  apiHost: string = 'http://localhost:8080/';
  user: User | undefined;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiHost + 'api/certificate', {
      headers: this.headers,
    });
  }

  revokeCertificate(alias: string): any {
    return this.http.get(this.apiHost + 'api/certificate/revoke/' + alias, {
      headers: this.headers,
    });
  }

  saveCertificate(alias: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.apiHost + 'api/certificate/save/' + alias,
      {
        headers: this.headers,
      }
    );
  }

  validateCertificate(alias: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.apiHost + 'api/certificate/checkValidity/' + alias,
      { headers: this.headers }
    );
  }

  createCertificate(createCertificateDTO: any) {
    return this.http.post<any>(
      this.apiHost + 'api/certificate/create',
      JSON.stringify(createCertificateDTO),
      {
        headers: this.headers,
      }
    );
  }

  createRootCertificate(certificateDTO: any) {
    return this.http.post<any>(
      this.apiHost + 'api/certificate/root/create',
      JSON.stringify(certificateDTO),
      {
        headers: this.headers,
      }
    );
  }

  getMyCertificates() {
    this.userService.getCurrentUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
    var userID = this.user?.email;
    return this.http.get<Certificate[]>(
      this.apiHost + 'api/certificate/userCertificates/' + userID,
      {
        headers: this.headers,
      }
    );
  }
}
