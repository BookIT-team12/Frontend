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
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchAccommodations();
  }

  initForm(): void {
    this.reportForm = this.fb.group({
      startPeriodDate: [null, Validators.required],
      endPeriodDate: [null, Validators.required],
      year: [null, Validators.required],
      selectedAccommodation: [null, Validators.required]
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

  generateReservationReport(): void {
    // Implement logic to generate reservation report
    console.log('Generating Reservation Report');
    console.log('Selected Start Date:', this.reportForm.value.startPeriodDate);
    console.log('Selected End Date:', this.reportForm.value.endPeriodDate);
    console.log('Selected Year:', this.reportForm.value.year);
    console.log('Selected Accommodation:', this.reportForm.value.selectedAccommodation);
    // Add your logic to generate the report
  }

  generateAccommodationReport(): void {
    // Implement logic to generate accommodation report
    console.log('Generating Accommodation Report');
    console.log('Selected Start Date:', this.reportForm.value.startPeriodDate);
    console.log('Selected End Date:', this.reportForm.value.endPeriodDate);
    console.log('Selected Year:', this.reportForm.value.year);
    console.log('Selected Accommodation:', this.reportForm.value.selectedAccommodation);
    // Add your logic to generate the report
  }
}

