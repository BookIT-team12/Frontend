import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
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
  generateTotalOwnersProfitReport(ownerID: string): Observable<Blob> {
    const url = `${this.baseUrl}/reports/totalOwnersProfit/${ownerID}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generateMonthlyIncomeForAccommodationReport(
    ownerID: string,
    accommodationId: number,
    year: number
  ): Observable<Blob> {
    const url = `${this.baseUrl}/reports/monthlyIncome/${ownerID}/${accommodationId}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
