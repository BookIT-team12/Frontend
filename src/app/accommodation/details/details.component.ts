import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationType, BookingConfirmationType} from "../../model/accommodation.model";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {CustomNotification} from "../../model/notification.model";
import {ReservationService} from "../../service/reservation.service";
import {Role, User} from '../../model/user.model';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AccommodationService} from '../../service/accommodation.service';
import {AuthService} from '../../access-control-module/auth.service';
import {Amenity} from '../../model/amenity.model';
import {FavoriteService} from '../../service/favorite.accommodation.service';
import {Observable} from 'rxjs';
import {NotificationService} from "../../service/notification.service";
import {Review} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";
import {ImagesService} from "../../service/images.service";
import {AccommodationResponseModel} from "../../model/accommodation.response.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  accommodation!: Accommodation;
  accommodationId!: number;
  amenities: Amenity[] = [];
  userRole!: Role;
  user!: User;
  isFavorite$: Observable<boolean>; // Observable to hold the isFavorite state
  guestId!: string;
  avgRating!:number;
  startDate!:Date;
  endDate!:Date;
  guestsNum:number = 1;
  accommodationType = "";
  wifi= false;
  parking= false;
  pool= false;
  balcony= false;
  bath= false;
  ac_unit= false;
  kitchen= false;
  reviews: Review[] = [];
  imagesHeaderFilesRoot: File[] = [];
  imagesHeaderStrings: string[] = [];
  constructor(private accommodationService: AccommodationService, private authService:AuthService, private route: ActivatedRoute, private reservationService:ReservationService,
      private favoriteService: FavoriteService, private notificationService: NotificationService, private reviewService: ReviewService, private imagesService: ImagesService
  , private router: Router) {this.isFavorite$ = new Observable<boolean>();}

  async ngOnInit(): Promise<void> {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.startDate = new Date(+(this.route.snapshot.paramMap.get('start') ?? NaN));
    this.endDate = new Date(+(this.route.snapshot.paramMap.get('end') ?? NaN));
    this.guestsNum = +(this.route.snapshot.paramMap.get('guestsNum') ?? 1);
    this.userRole = this.authService.getRole();
    await this.loadAccommodations(this.accommodationId);
    this.imagesService.setArrays(this.imagesHeaderFilesRoot, this.imagesHeaderStrings);
    this.imagesService.addFileTypeToImages();
    this.imagesService.turnStringsToImages();
    await this.putImagesIntoSets();

    this.authService.getCurrentUser().subscribe((userOrNull) =>{
      this.guestId = userOrNull!.email;
    });

    this.updateIsFavorite(); // Add this line to initialize isFavorite$

    this.isFavorite$.subscribe((isFavorite) => {
      console.log('Is Favorite:', isFavorite);
    });

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.updateIsFavorite();
      }
    });
  }

  getUrl(file: File){
    return this.imagesService.getUrl(file);
  }

  async putImagesIntoSets(){
    let i = 0;
    this.imagesHeaderFilesRoot.forEach(value => {
      value = this.imagesHeaderFilesRoot[i]
      i++;
    })
  }

  async loadAccommodations(id: number) {
    console.log('aaa');
    const data:AccommodationResponseModel|undefined = await this.accommodationService.getAccommodationById(id).toPromise();
    if(data){
      this.accommodation=data.first;
      this.imagesHeaderStrings = data.second;
      this.updateIsFavorite();
      console.log(this.accommodation);
      this.reviewService.getAllReviewAccommodation(this.accommodation.id!).subscribe(
          (data)=>{
            console.log(data);
            this.reviews = data;
          }
      )
      this.reviewService.getAccommodationAverageGrade(this.accommodation.id!).subscribe(
          (data)=>{
            console.log(data);
            this.avgRating = data;
          }
      )
      if(this.accommodation.accommodationType == AccommodationType.APARTMENT){
        this.accommodationType = "Apartment";
      } else if(this.accommodation.accommodationType == AccommodationType.ROOM){
        this.accommodationType = "Room";
      } else if (this.accommodation.accommodationType == AccommodationType.HOTEL){
        this.accommodationType = "Hotel";
      } else {
        this.accommodationType = "Studio";
      }
      for(let amenity of this.accommodation.amenities){
        if(amenity == 1){
          this.parking = true;
        } else if(amenity == 2){
          this.wifi = true;
        } else if(amenity == 3){
          this.ac_unit = true;
        } else if(amenity == 4){
          this.kitchen = true;
        } else if(amenity == 5){
          this.bath = true;
        } else if(amenity == 6){
          this.pool = true;
        } else if(amenity == 7){
          this.balcony = true;
        }
      }
    } else {
      console.error('Error loading accommodations ')
    }
  }

  //todo: TESTIRATI DODAVANJE U FAVORITE NAKON STO ZAVRSIS SINGLE DETAIL PAGE!!!!!!
  // dodata funkcija za dodavanje u favorites @umuskinja
  // stilizuj html/css, kada budes radio


  //Function to check if the accommodation is a favorite
  updateIsFavorite(): void {
    if (this.user?.email && this.accommodation?.id) {
      this.isFavorite$ = this.favoriteService.isFavorite(
        this.user.email,
        this.accommodation.id
      );
    } else {
      // Handle the case where either user email or accommodation id is undefined
      this.isFavorite$ = new Observable<boolean>();
    }
  }

  // Function to handle adding to favorites
  toggleFavorite(): void {
    if (this.user && this.accommodation) {
      this.isFavorite$.subscribe((isFavorite) => {
        if (isFavorite) {
          // Remove from favorites
          if (this.accommodation.id) {
            this.favoriteService.removeFavorite(
              this.user.email,
              this.accommodation.id
            );
          }
        } else {
          // Add to favorites
          if (this.accommodation.id) {
            this.favoriteService.addFavorite(
              this.user.email,
              this.accommodation.id
            );
          }
        }
      });
    }
  }
  bookITClicked(){
    if(this.accommodation.bookingConfirmationType == BookingConfirmationType.AUTOMATIC){
      const reservation = new Reservation(
        this.accommodationId,
        this.guestId,
        this.startDate,
        this.endDate,
        this.guestsNum,
        ReservationStatus.APPROVED,
        true,
        0
        );
      this.reservationService.createReservation(reservation).subscribe(
          (res:Reservation) => {
            if(res){
              const message: string = "Reservation request has been sent for the accommodation: " + this.accommodation.name;
              const notification: CustomNotification = new CustomNotification(
                  this.accommodation.ownerEmail,
                  message
              );
              this.notificationService.createNotification(notification).subscribe(
                  (data:CustomNotification) => {
                    if(data){
                      console.log("Notification sent! ");
                    }
                    else{console.log("Error sending notification! ");}
                  });
              alert("Reservation successful! ");
              this.router.navigate(['/main'])
            }
            else{alert("Reservation unsuccessful! ")}
          });
    }
    else{
      const reservation = new Reservation(
        this.accommodationId,
        this.guestId,
        this.startDate,
        this.endDate,
        this.guestsNum,
        ReservationStatus.PENDING,
        true,
        0
        );
      this.reservationService.createReservation(reservation).subscribe(
          (res:Reservation) => {
            if(res){
              const message: string = "Reservation request has been sent for the accommodation: " + this.accommodation.name;
              const notification: CustomNotification = new CustomNotification(
                  this.accommodation.ownerEmail,
                  message
              );
              this.notificationService.createNotification(notification).subscribe(
                  (data:CustomNotification) => {
                  if(data){
                    console.log("Notification sent! ");
                  }
                  else{console.log("Error sending notification! ");}
              });
              alert("Reservation request sent! ");
              this.router.navigate(['/main'])
            }
            else{alert("Reservation unsuccessful! ")}
          });
    }

  }

  protected readonly Role = Role;
}
