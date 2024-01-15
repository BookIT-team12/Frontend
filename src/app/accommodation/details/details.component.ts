import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationType} from "../../model/accommodation.model";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {ReservationService} from "../../service/reservation.service";
import { Role, User } from '../../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../../service/accommodation.service';
import { AuthService } from '../../access-control-module/auth.service';
import { Amenity } from '../../model/amenity.model';
import { FavoriteService } from '../../service/favorite.accommodation.service';
import { Observable } from 'rxjs';

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
  accommodationType = "";
  wifi= false;
  parking= false;
  pool= false;
  balcony= false;
  bath= false;
  ac_unit= false;
  kitchen= false;
  constructor(private accommodationService: AccommodationService, private authService:AuthService, private route: ActivatedRoute, private reservationService:ReservationService,
      private favoriteService: FavoriteService) {this.isFavorite$ = new Observable<boolean>();}

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.startDate = new Date(+(this.route.snapshot.paramMap.get('start') ?? NaN));
    this.endDate = new Date(+(this.route.snapshot.paramMap.get('end') ?? NaN));
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
        console.log(this.accommodation)
        let sum = 0;
        for(let review of this.accommodation.reviews){
          sum += review.rating;
        }
        if(this.accommodation.reviews.length == 0){
          this.avgRating = 0;
        }
        else{
          this.avgRating = (sum/this.accommodation.reviews.length)-(sum/this.accommodation.reviews.length%10);
        }
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
    // console.log(this.accommodationId)
    // console.log(this.startDate)
    // console.log(this.endDate)
    // this.authService.getCurrentUser().subscribe((userOrNull) =>{
    //   console.log("USER: ");
    //   console.log(userOrNull);
    //   this.guestId = userOrNull!.email;
    //   console.log(this.guestId);
    // });
    // console.log("PRVO OVO");
    // console.log(this.guestId);
    const reservation = new Reservation(
        this.accommodationId,
        this.guestId,
        this.startDate,
        this.endDate,
        1,
        ReservationStatus.PENDING,
        true
    )
    // console.log("ONDA OVO");
    this.reservationService.createReservation(reservation).subscribe(
        (res:Reservation) => {
            if(res){alert("Reservation successful! ")}
            else{alert("Reservation unsuccessful! ")}
        });

  }

  protected readonly Role = Role;
}
