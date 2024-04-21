import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HostCertificateRequest} from "../model/host-certificate-request";

@Injectable({
  providedIn: 'root'
})
export class HostRequestService {
  apiHost: string = 'http://localhost:8080/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createCertificateRequest(hostCertificateRequest: HostCertificateRequest) {
    return this.http.post<any>(
      this.apiHost + 'api/certificateRequest/create',
      JSON.stringify(hostCertificateRequest),
      {
        headers: this.headers,
      }
    );
  }


}
