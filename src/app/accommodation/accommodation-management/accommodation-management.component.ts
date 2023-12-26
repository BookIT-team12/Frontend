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

    //TODO: VALIDACIJE
  constructor(private http: HttpClient, private accommodationService:AccommodationService,
              private cdr: ChangeDetectorRef, private authService: AuthService,
              private fb: FormBuilder, private map: MapService, private imageService: ImagesService,
              private periodService: AvailabilityPeriodService, private amenitiesService: AmenitiesService) {

    this.accommodationForm = this.fb.group({
      owner: '',
      name : '',
      maxGuests: 0,
      minGuests: 0,
      description: '',
      accommodationType: '',
      bookingConfirmationType: '',
      endDate: undefined,
      startDate: undefined,
      availableFrom: undefined,
      availableUntil: undefined,
      price: 0,
      reviews: [],
      reservations: []
    })

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
        this.map.getSelectedLocation()
    );

    this.periodService.patchUpHourTimezoneProblem(newAccommodation.availabilityPeriods);

    this.accommodationService.createAccommodation(newAccommodation, this.imageFiles).subscribe(
        (result) => {
          console.log('Accommodation created successfully', result);
        },
        (error) => {
          console.error('Error creating accommodation', error);
        }
    );
  }

  ngAfterViewInit(): void {
    this.map.InitAfterViewCreation()
  }

}
