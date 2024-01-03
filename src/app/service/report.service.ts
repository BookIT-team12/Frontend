import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  generateReservationReport(
    ownerID: string,
    startDate: string,
    endDate: string,
  ): Observable<Blob> {
    const url = `${this.baseUrl}/reports/reservation/${ownerID}/${startDate}/${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
