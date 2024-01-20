import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../service/accommodation.service";
import {AuthService} from "../access-control-module/auth.service";
import { DomSanitizer } from '@angular/platform-browser';
import {ReportService} from "../service/report.service";
import {User} from "../model/user.model";
declare var Jaspersoft: any; // Declare JasperReports JavaScript API

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportContent: any;
  reportForm!: FormGroup;
  accommodations: any[] = [];
  jasperReportUrl: string | null = null;
  user!:User | null;
  ownerID!:string;

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private authService: AuthService,
    private reportService:ReportService,
    private sanitizer: DomSanitizer) {
    this.reportForm = this.fb.group({
      reportType: ['reservation', Validators.required],
      startPeriodDate: [null, Validators.required],
      endPeriodDate: [null, Validators.required],
      year: [null, Validators.required],
      selectedAccommodation: [null, Validators.required],
    });
    this.authService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.ownerID=user.email;
      }});

  }

  ngOnInit(): void {
    this.initForm();
    this.fetchAccommodations();
  }



  initForm(): void {
    this.reportForm = this.fb.group({
      reportType: ['reservation', Validators.required],
      startPeriodDate: [null, Validators.required],
      endPeriodDate: [null, Validators.required],
      year: [null, Validators.required],
      selectedAccommodation: [null, Validators.required],
    });
  }

  fetchAccommodations(): void {
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.accommodationService.getOwnerAccommodations(user.email).subscribe(
          (accommodations) => {
            this.accommodations = accommodations;
          },
          (error) => {
            console.error('Error fetching owner accommodations:', error);
          }
        );
      }
    });
  }


  // Helper functions to determine the selected report type
  isReservationReport(): boolean {
    return this.reportForm.get('reportType')?.value === 'reservation';
  }

  isAccommodationReport(): boolean {
    return this.reportForm.get('reportType')?.value === 'accommodation';
  }

  generateReport(): void {
    const reportType = this.reportForm.get('reportType')?.value;
    const parameters = {
      ownerID:this.ownerID,
      startPeriodDate: this.reportForm.get('startPeriodDate')?.value,
      endPeriodDate: this.reportForm.get('endPeriodDate')?.value,
      year: this.reportForm.get('year')?.value,
      selectedAccommodation: this.reportForm.get('selectedAccommodation')?.value,
    };

    if (parameters.startPeriodDate && parameters.endPeriodDate) {
      parameters.startPeriodDate = this.formatDate(parameters.startPeriodDate);
      parameters.endPeriodDate = this.formatDate(parameters.endPeriodDate);
    }

    if(this.reportForm.get('reportType')?.value === 'reservation'){
    this.reportService.generateReservationReport(parameters.ownerID, parameters.startPeriodDate, parameters.endPeriodDate)
      .subscribe((data) => {
        this.reportContent = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
      }
      );}
    else if(this.reportForm.get('reportType')?.value === 'accommodation'){

      this.reportService.generateMonthlyIncomeForAccommodationReport(parameters.ownerID, parameters.selectedAccommodation, parameters.year)
        .subscribe((data) => {
            this.reportContent = this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(data)
            );
          }
        );

    }else if(this.reportForm.get('reportType')?.value === 'totalOwnersProfit'){
      this.reportService.generateTotalOwnersProfitReport(parameters.ownerID)
        .subscribe((data) => {
            this.reportContent = this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(data)
            );
          }
        );
    }

  }

  private formatDate(date: Date): string {
    // Format the date to ISO 8601 format
    return date.toISOString().split('T')[0];
  }



}

