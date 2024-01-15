import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationType} from "../../model/accommodation.model";
import {Role} from "../../model/user.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../service/accommodation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {ReservationService} from "../../service/reservation.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  accommodation!: Accommodation;
  accommodationId!:number;
  userRole!: Role;
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
  constructor(private accommodationService: AccommodationService, private authService:AuthService, private route: ActivatedRoute, private reservationService:ReservationService) {
  }
  ngOnInit():void{
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.startDate = new Date(+(this.route.snapshot.paramMap.get('start') ?? NaN));
    this.endDate = new Date(+(this.route.snapshot.paramMap.get('end') ?? NaN));
    this.userRole = this.authService.getRole();
    this.authService.userAccount$.subscribe(user => {
      this.loadAccommodations(this.accommodationId);
    });
    this.authService.getCurrentUser().subscribe((userOrNull) =>{
      this.guestId = userOrNull!.email;
    });
  }

  loadAccommodations(id:number){
    console.log("aaa")
    this.accommodationService.getAccommodationById(id).subscribe(
      (data)=>
      {
        this.accommodation=data.first;
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
