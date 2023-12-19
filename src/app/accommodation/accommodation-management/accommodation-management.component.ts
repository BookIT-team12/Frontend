import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccommodationService} from "../../service/accommodation.service";
import {Accommodation, AccommodationType, BookingConfirmationType, Status} from "../../model/accommodation.model";
import {Amenity} from "../../model/amenity.model";
import {Review} from "../../model/review.model";
import {Reservation} from "../../model/reservation.model";
import {UserService} from "../../service/user.service";

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


  accommodationForm = {
    name: '',
    guests: 0,
    price: 0,
    description: '',
    images: [] as File[], //TODO: UVEZI SLIKE I LOKACIJU NA BEKU!
    imageUrl: '',
    location:'',
    availableFrom:new Date(),
    availableUntil:new Date(),
    accommodationType: '',  // Add accommodation type field
    bookingConfirmationType: '',  // Add booking confirmation type field
    amenities: this.amenities,
    reviews: this.reviews,
    reservations: this.reservations
  };

  //TODO:IZMENI ID USER-A DA BUDE ID, A NE PERA!
  constructor(private http: HttpClient, private accommodationService:AccommodationService, private userService:UserService) {

    /*    this.userService.getUser('pera').subscribe(
          (response) => {
            // Check if the user is available in the response body
            const user = response.body;
            if (user) {
              this.user = user;
              console.log('User Pera info: ', this.user);
            } else {
              console.error('User not found');
            }
          },
          (error) => {
            console.error('Error getting user', error);
          }
        );
      }*/
  }

//fixme: OVDE SE NE POSTAVLJA STATUS NA PENDING KADA TREBA DA SE ODOBRI AKOMODACIJA(PRVO JE OWNER KREIRA I TREBA DA ODE NA PENDING PA ONDA DA JE ADMIN ODOBRI!!!!)

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.accommodationForm.images.push(files.item(i) as File);
      }
    }
  }

  getUrl(file: File): string {
    //console.log(URL.createObjectURL(file))
    return URL.createObjectURL(file);
  }


  onSubmit(): void {

    const accommodationData = {
      ownerEmail: 'dusan@gmail.com',
      accommodationType: AccommodationType[this.accommodationForm.accommodationType as keyof typeof AccommodationType],
      description: this.accommodationForm.description,
      name: this.accommodationForm.name,
      minGuests: this.accommodationForm.guests,
      maxGuests: this.accommodationForm.guests,
      amenities: this.amenities, // Add amenities based on your form input
      reviews: this.reviews, // You can add reviews if needed
      reservations: this.reservations, // You can add reservations if needed
      bookingConfirmationType: BookingConfirmationType[this.accommodationForm.bookingConfirmationType as keyof typeof BookingConfirmationType  ],

      availabilityPeriods: [
        {
          startDate: this.accommodationForm.availableFrom,
          endDate: this.accommodationForm.availableUntil,
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
        Status.PENDING
    );
    console.log('New accommodation: ', newAccommodation)



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


}


