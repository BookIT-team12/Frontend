import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HostCertificateRequest} from "../model/host-certificate-request";
import {Observable} from "rxjs";
import {Certificate} from "../model/certificate";

@Injectable({
  providedIn: 'root'
})
export class HostRequestService {
  apiHost: string = 'http://localhost:8081/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createCertificateRequest(hostCertificateRequest: HostCertificateRequest) {
    return this.http.post<any>(
      this.apiHost + 'api/certificates/request/create',
      JSON.stringify(hostCertificateRequest),
      {
        headers: this.headers,
      }
    );
  }


  getAllRequests(): Observable<HostCertificateRequest[]> {
    return this.http.get<HostCertificateRequest[]>(this.apiHost + 'api/certificates/request/all', {
      headers: this.headers,
    });
  }
}
