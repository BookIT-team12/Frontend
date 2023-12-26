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

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationManagementComponent implements AfterViewInit {

  accommodationForm: FormGroup;
  imageFiles: File[] = [];

    //TODO: VALIDACIJE
  constructor(private http: HttpClient, private accommodationService:AccommodationService,
              private cdr: ChangeDetectorRef, private authService: AuthService,
              private fb: FormBuilder, private map: MapService, private imageService: ImagesService) {

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
      amenities: this.fb.array([]),
      reviews: [],
      reservations: []
    })

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
    if (event.checked) {
      this.accommodationForm.value.amenities.push(amenity.id);
    } else {
      // Remove the amenity if unchecked
      const index = this.accommodationForm.value.amenities.findIndex((a:number) => a === amenity.id);
      if (index !== -1) {
        this.accommodationForm.value.amenities.splice(index, 1);
      }
    }
  }

  addHourToSelectedAvailabilityPeriod(){
    this.accommodationForm.value.startDate.setHours(this.accommodationForm.value.startDate.getHours() + 1);
    this.accommodationForm.value.endDate.setHours(this.accommodationForm.value.endDate.getHours() + 1)
  }

  onSubmit(): void {
    this.addHourToSelectedAvailabilityPeriod()

    const accommodationData = {
      ownerEmail: this.accommodationForm.value.owner,
      accommodationType: AccommodationType[this.accommodationForm.value.accommodationType as keyof typeof AccommodationType],
      description: this.accommodationForm.value.description,
      name: this.accommodationForm.value.name,
      minGuests: this.accommodationForm.value.minGuests,
      maxGuests: this.accommodationForm.value.maxGuests,
      amenities: this.accommodationForm.value.amenities,
      reviews: this.accommodationForm.value.reviews,
      reservations: this.accommodationForm.value.reservations,
      bookingConfirmationType: BookingConfirmationType[this.accommodationForm.value.bookingConfirmationType as keyof typeof BookingConfirmationType],
      availabilityPeriods: [
        {
          startDate: this.accommodationForm.value.startDate,
          endDate: this.accommodationForm.value.endDate,
          price: this.accommodationForm.value.price
        }
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
