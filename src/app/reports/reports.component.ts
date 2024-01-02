import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../service/accommodation.service";
import {AuthService} from "../access-control-module/auth.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportForm!: FormGroup;
  accommodations: any[] = []; // Replace 'any' with the actual type of your accommodation model

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private authService: AuthService
  ) {
    this.reportForm = this.fb.group({
      reportType: ['reservation', Validators.required],
      startPeriodDate: [null, Validators.required],
      endPeriodDate: [null, Validators.required],
      year: [null, Validators.required],
      selectedAccommodation: [null, Validators.required],
    });
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

  // The function to generate the report
  generateReport(): void {
    // Your logic here based on selected report type and form values
    console.log('Generating Report:', this.reportForm.value);
  }
}

