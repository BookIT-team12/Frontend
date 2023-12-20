import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccommodationService} from "../../service/accommodation.service";
import {
  Accommodation,
  AccommodationStatus,
  AccommodationType,
  BookingConfirmationType
} from "../../model/accommodation.model";
import {Amenity} from "../../model/amenity.model";
import {Review} from "../../model/review.model";
import {Reservation} from "../../model/reservation.model";
import {UserService} from "../../service/user.service";
import {ConsoleLogger} from "@angular/compiler-cli";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../access-control-module/auth.service";

//TODO:IZMENITI DA USER BUDE LOGOVANI KORISNIK KOJI DODAJE AKOMODACIJE!!!!

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationManagementComponent{
 // user=new User('Pera', 'Peric', 'pera','test', 'Novi Sad', '1234567890', Role.OWNER, 'test') ; //NON-NULL VREDNOST USER-A
  amenities: number[]=[];
  reviews:Review[]=[];
  reservations:Reservation[]=[];

  availableFrom: Date;
  availableUntil: Date;
  //fixme: form should be form not like this, and these two dates should be inside form
  //fixme: you need to make timezones the same. TIMEZONE PROBLEM IS DESCRIBED BELLOW:
//   TIMEZONE PROBLEM: THING ABOUT THIS PROBLEM IS THAT ON THE FRONT I HAVE 25. DEC AT MIDNIGHT (00:00) AND WHEN I SEND IT
//   TO BACKEND I GET 24. DEC AT (23:00). I GUESS ITS ABOUT SOME TIMEZONES AND I NEED TO FIX THIS LATER, FOR NOW ITS
//   PATCHED UP JUST BY ADDING ONE HOUR TO VALUE BEFORE SUBMITTING FORM

//TODO:IZMENI ID USER-A DA BUDE ID, A NE PERA!
  accommodationForm ={
    owner: '',
    name: '',
    minGuests: 0,
    maxGuests: 0,
    price: 0,
    description: '',
    images: [] as File[], //TODO: UVEZI SLIKE I LOKACIJU NA BEKU!
    imageUrl: '',
    location:'',
    accommodationType: '',  // Add accommodation type field
    bookingConfirmationType: '',  // Add booking confirmation type field
    amenities: this.amenities,
    reviews: this.reviews,
    reservations: this.reservations
  };

  constructor(private http: HttpClient, private accommodationService:AccommodationService,
              private userService:UserService, private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.availableUntil = new Date();
    this.availableFrom = new Date();

    this.authService.getCurrentUser().subscribe(user=>{
      if (user) {
        this.accommodationForm.owner = user.email;
      }
    })
  }




  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.accommodationForm.images.push(files.item(i) as File);
      }
    }
  }
  deleteImage(toDelete: File){
    let index = this.accommodationForm.images.findIndex(image => image === toDelete);
    if (index !== -1) {
      this.accommodationForm.images.splice(index, 1);
    }
    this.cdr.detectChanges()
  }
  getUrl(file: File): string {
    return URL.createObjectURL(file);
  }


  onAmenityChange(event: any, amenity: Amenity): void {
    // Handle the change in the checkbox state
    if (event.checked) {
      this.amenities.push(amenity.id);
    } else {
      // Remove the amenity if unchecked
      const index = this.amenities.findIndex(a => a === amenity.id);
      if (index !== -1) {
        this.amenities.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    this.availableUntil.setHours(this.availableUntil.getHours() + 1);
    this.availableFrom.setHours(this.availableFrom.getHours() + 1)
    const accommodationData = {
      ownerEmail: this.accommodationForm.owner,
      accommodationType: AccommodationType[this.accommodationForm.accommodationType as keyof typeof AccommodationType],
      description: this.accommodationForm.description,
      name: this.accommodationForm.name,
      minGuests: this.accommodationForm.minGuests,
      maxGuests: this.accommodationForm.maxGuests,
      amenities: this.amenities, // Add amenities based on your form input
      reviews: this.reviews, // You can add reviews if needed
      reservations: this.reservations, // You can add reservations if needed
      bookingConfirmationType: BookingConfirmationType[this.accommodationForm.bookingConfirmationType as keyof typeof BookingConfirmationType  ],

      availabilityPeriods: [
        {
          startDate: this.availableFrom,
          endDate: this.availableUntil,
          price: this.accommodationForm.price
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
      AccommodationStatus.PENDING
    );
    console.log('New accommodation: ', newAccommodation)

    console.log(newAccommodation);

    this.accommodationService.createAccommodation(newAccommodation, this.accommodationForm.images).subscribe(
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


}


