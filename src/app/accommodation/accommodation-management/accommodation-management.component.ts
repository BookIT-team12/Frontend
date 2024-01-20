import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccommodationService} from "../../service/accommodation.service";
import {
  Accommodation,
  AccommodationStatus,
  AccommodationType,
  BookingConfirmationType
} from "../../model/accommodation.model";
import {Amenity} from "../../model/amenity.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../access-control-module/auth.service";
import {MapService} from "../../service/map.service";
import {ImagesService} from "../../service/images.service";
import {AvailabilityPeriod} from "../../model/availability-period.model";
import {AvailabilityPeriodService} from "../../service/availability-period.service";
import {AmenitiesService} from "../../service/amenities.service";
import {AccommodationValidationService} from "../../service/accommodation.validation.service";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationManagementComponent implements AfterViewInit {

  accommodationForm: FormGroup;
  imageFiles: File[] = [];
  amenities: number[] = [];

  constructor(private http: HttpClient, private accommodationService:AccommodationService,
              private cdr: ChangeDetectorRef, private authService: AuthService,
              private fb: FormBuilder, private map: MapService, private imageService: ImagesService,
              private periodService: AvailabilityPeriodService, private amenitiesService: AmenitiesService,
              private  validationService: AccommodationValidationService, public dialog: MatDialog, private router:Router) {

    this.accommodationForm = this.fb.group({
      owner: '',
      name : ['', [Validators.required]],
      maxGuests: [null],
      minGuests: [null, [Validators.min(1)]],
      description: ['', [Validators.maxLength(200)]],
      accommodationType: [null, [Validators.required]],
      bookingConfirmationType: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required, validationService.startBeforeToday()]],
      price: [null, [Validators.min(1)]],
      reviews: [],
      reservations: [],
      cancelAllow: [0, [Validators.min(0)]],
      priceByHead: false
    }, {validators: [validationService.minMaxGuestsValidator(), validationService.startBeforeEndValidatior()]})

    this.amenitiesService.setCheckedAmenities(this.amenities)

    this.authService.getCurrentUser().subscribe(user=>{
      if (user) {
        this.accommodationForm.patchValue({
            owner: user.email
        })
      }
    })

    this.imageService.setFileArray(this.imageFiles);
  }
  openErrorDialog(){
    this.validationService.setListOfErrors(this.accommodationForm.errors, this.amenities, this.map.getSelectedLocation(), this.imageFiles);
    if (this.validationService.shouldOpenDialog()) {
      this.dialog.open(DialogElementsExampleDialog);
    }
  }

  onFileSelected(event: any): void {
  this.imageService.onFileSelected(event);
  this.cdr.detectChanges();
  }
  deleteImage(toDelete: File){
    this.imageService.deleteImage(toDelete);
    this.cdr.detectChanges()
  }
  getUrl(file: File): string {
    return this.imageService.getUrl(file);
  }


  onAmenityChange(event: any, amenity: Amenity): void {
    this.amenitiesService.onAmenityChange(event, amenity);
  }

  onSubmit(): void {
    if(this.amenities.length === 0 || this.imageFiles.length === 0 || this.map.getSelectedLocation() === this.map.undefinedBasicLocation){
      this.openErrorDialog();   //these arent form fields, and that i why i need to check em here, cause they wont raise an error by themselves
      return;
    }
    if (this.accommodationForm.valid) {
      const accommodationData = {
        ownerEmail: this.accommodationForm.value.owner,
        accommodationType: AccommodationType[this.accommodationForm.value.accommodationType as keyof typeof AccommodationType],
        description: this.accommodationForm.value.description,
        name: this.accommodationForm.value.name,
        minGuests: this.accommodationForm.value.minGuests,
        maxGuests: this.accommodationForm.value.maxGuests,
        amenities: this.amenities,
        reviews: this.accommodationForm.value.reviews,
        reservations: this.accommodationForm.value.reservations,
        bookingConfirmationType: BookingConfirmationType[this.accommodationForm.value.bookingConfirmationType as keyof typeof BookingConfirmationType],
        availabilityPeriods: [
          new AvailabilityPeriod(this.accommodationForm.value.startDate, this.accommodationForm.value.endDate,
              this.accommodationForm.value.price)
        ],
        cancelAllow: this.accommodationForm.value.cancelAllow,
        priceByHead: this.accommodationForm.value.priceByHead
      };

      // Convert accommodationData to Accommodation
      const newAccommodation = new Accommodation(
          accommodationData.ownerEmail,
          accommodationData.accommodationType,
          accommodationData.description,
          accommodationData.name,
          accommodationData.minGuests,
          accommodationData.maxGuests,
          accommodationData.amenities,
          accommodationData.reviews,
          accommodationData.reservations,
          accommodationData.bookingConfirmationType,
          accommodationData.availabilityPeriods,
          AccommodationStatus.PENDING,
          this.map.getSelectedLocation(),
        false,
          accommodationData.cancelAllow,
          accommodationData.priceByHead
      );

      this.periodService.patchUpHourTimezoneProblem(newAccommodation.availabilityPeriods);
      this.accommodationService.createAccommodation(newAccommodation, this.imageFiles).subscribe(
          (result) => {
            console.log('Accommodation created successfully', result);
            this.router.navigate(["/main"])
          },
          (error) => {
            console.error('Error creating accommodation', error);
          }
      );
    }
    else {
      console.error("INVALID FORM")
      console.log("Form errors:", this.accommodationForm.errors)
      this.openErrorDialog();
    }
  }

  ngAfterViewInit(): void {
    this.map.InitAfterViewCreation()
  }

  onPricingPolicyChange($event: MatRadioChange) {
    this.accommodationForm.value.priceByHead = this.accommodationForm.value.priceByHead !== true;
  }
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgForOf, MatIconModule, MatInputModule],
})
export class DialogElementsExampleDialog {
  mapOfErrorsToDisplay: Map<string, boolean|undefined>;
  textToDisplay: string[] = [];
  endBeforeStartTxt = "End date cant be set before start date";
  minGuestBiggerThanMaxGuestTxt = "Number of minimal guests must be lower than number of maximum guests";
  noAmenitiesTxt = "You must select some of the amenities for your apartment";
  noLocationTxt = "You must select apartment location";
  noImagesTxt = "You must provide at least 1 image for your apartment";

  constructor(private service: AccommodationValidationService) {
    this.mapOfErrorsToDisplay = this.service.getErrorsForDialog();
    if (this.mapOfErrorsToDisplay.get('minMaxGuestErr') === true){
      this.textToDisplay.push(this.minGuestBiggerThanMaxGuestTxt);
    }
    if (this.mapOfErrorsToDisplay.get('endBeforeStartErr')){
      this.textToDisplay.push(this.endBeforeStartTxt);
    }
    if (this.mapOfErrorsToDisplay.get('noAmenities')){
      this.textToDisplay.push(this.noAmenitiesTxt);
    }
    if (this.mapOfErrorsToDisplay.get('noImages')){
      this.textToDisplay.push(this.noImagesTxt);
    }
    if (this.mapOfErrorsToDisplay.get('noLocation')){
      this.textToDisplay.push(this.noLocationTxt);
    }
  }

}
