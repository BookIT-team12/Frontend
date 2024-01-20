import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../access-control-module/auth.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {AccommodationService} from "../../service/accommodation.service";
import {ReservationDetails} from "../../model/reservation-details.model";
import {Role} from "../../model/user.model";

@Component({
  selector: 'app-guest-active',
  templateUrl: './guest-active.component.html',
  styleUrls: ['./guest-active.component.css']
})
export class GuestActiveComponent implements OnInit {
  reservations: Reservation[]=[];
  reservationDetails: ReservationDetails[]=[];
  userRole?: Role;
  constructor(private reservationService: ReservationService, private authService:AuthService, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadReservations(user.email);
        this.userRole = user.role;
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
  cancelReservation(dto: ReservationDetails){
    const reservation: Reservation = new Reservation(dto.accommodationId, dto.guestEmail, dto.startDate, dto.endDate, dto.numberOfGuests, ReservationStatus.CANCELED, true, dto.price);
    reservation.id = dto.id;
    this.reservationService.cancelReservation(reservation).subscribe(
        (data) =>
        {
          if(data.valid){
            alert("Cancel successful! ")

          } else {
            alert("Cancel unsuccessful! :( ")
          }
        }
    );
  }
  protected readonly Role = Role;
  protected readonly ReservationStatus = ReservationStatus;
}
