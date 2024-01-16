import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../access-control-module/auth.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation} from "../../model/reservation.model";
import {AccommodationService} from "../../service/accommodation.service";
import {ReservationDetails} from "../../model/reservation-details.model";

@Component({
  selector: 'app-guest-active',
  templateUrl: './guest-active.component.html',
  styleUrls: ['./guest-active.component.css']
})
export class GuestActiveComponent implements OnInit {
  reservations: Reservation[]=[];
  reservationDetails: ReservationDetails[]=[];
  constructor(private reservationService: ReservationService, private authService:AuthService, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadReservations(user.email);
      }
    });
  }
  loadReservations(guestId:string){
    this.reservationService.getGuestReservations(guestId).subscribe(
        (data)=>
        {
          for(const res of data){
              this.accommodationService.getAccommodationById(res.accommodationId).subscribe(accommodation =>{
                if(accommodation){
                  this.reservationDetails.push(new ReservationDetails(res, accommodation.first.name, accommodation.first.location.address));
                }
              });
          }
          this.reservations=data;
        },
        (error)=>{
          console.error('Error loading accommodations: ', error)
        }
    )
  }
}
