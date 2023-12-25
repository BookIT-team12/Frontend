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

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationManagementComponent implements AfterViewInit {

  accommodationForm: FormGroup;
    //TODO: VALIDACIJE
  constructor(private http: HttpClient, private accommodationService:AccommodationService,
              private cdr: ChangeDetectorRef, private authService: AuthService,
              private fb: FormBuilder, private map: MapService) {

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
      images: this.fb.array([]),
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
  }

  //i use this inside html. when it doesnt recognise something good or doesnt see it as good type, this is good way
  //to solve it. basicly just send it as something you need there and it works.
  getAccommodationImages(): File[]{
    return this.accommodationForm.value.images;
  }

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.accommodationForm.value.images.push(files.item(i) as File);
      }
    }
    this.cdr.detectChanges();
  }
  deleteImage(toDelete: File){
    let index = this.accommodationForm.value.images.findIndex((image: File) => image === toDelete);
    if (index !== -1) {
      this.accommodationForm.value.images.splice(index, 1);
    }
    this.cdr.detectChanges()
  }
  getUrl(file: File): string {
    return URL.createObjectURL(file);
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

    this.accommodationService.createAccommodation(newAccommodation, this.accommodationForm.value.images).subscribe(
        (result) => {
          // Handle success, if needed
          console.log('Accommodation created successfully', result);
        },
        (error) => {
          // Handle error, if needed
          console.error('Error creating accommodation', error);
        }
    );
  }

  ngAfterViewInit(): void {
    this.map.InitAfterViewCreation()
  }

}


