import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationType, BookingConfirmationType} from "../../model/accommodation.model";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {CustomNotification} from "../../model/notification.model";
import {ReservationService} from "../../service/reservation.service";
import {Role, User} from '../../model/user.model';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../service/accommodation.service';
import {AuthService} from '../../access-control-module/auth.service';
import {Amenity} from '../../model/amenity.model';
import {FavoriteService} from '../../service/favorite.accommodation.service';
import {Observable} from 'rxjs';
import {NotificationService} from "../../service/notification.service";
import {Review} from "../../model/review.model";
import {ReviewService} from "../../service/review.service";

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
  constructor(private accommodationService: AccommodationService, private authService:AuthService, private route: ActivatedRoute, private reservationService:ReservationService,
      private favoriteService: FavoriteService, private notificationService: NotificationService, private reviewService: ReviewService) {this.isFavorite$ = new Observable<boolean>();}

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.startDate = new Date(+(this.route.snapshot.paramMap.get('start') ?? NaN));
    this.endDate = new Date(+(this.route.snapshot.paramMap.get('end') ?? NaN));
    this.guestsNum = +(this.route.snapshot.paramMap.get('guestsNum') ?? 1);
    this.userRole = this.authService.getRole();
    this.authService.userAccount$.subscribe((user) => {
      this.loadAccommodations(this.accommodationId);
    });
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

  loadAccommodations(id: number) {
    console.log('aaa');
    this.accommodationService.getAccommodationById(id).subscribe(
      (data)=>
      {
        this.accommodation=data.first;
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
        // let sum = 0;
        // for(let review of this.accommodation.reviews){
        //   sum += review.rating;
        // }
        // if(this.accommodation.reviews.length == 0){
        //   this.avgRating = 0;
        // }
        // else{
        //   this.avgRating = (sum/this.accommodation.reviews.length)-(sum/this.accommodation.reviews.length%10);
        // }
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
      },
      (error)=>{
        console.error('Error loading accommodations: ', error)
      }
        );
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
                    if(data){console.log("Notification sent! ");}
                    else{console.log("Error sending notification! ");}
                  });
              alert("Reservation successful! ");
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
                  if(data){console.log("Notification sent! ");}
                  else{console.log("Error sending notification! ");}
              });
              alert("Reservation request sent! ");
            }
            else{alert("Reservation unsuccessful! ")}
          });
    }

  }

  protected readonly Role = Role;
}
