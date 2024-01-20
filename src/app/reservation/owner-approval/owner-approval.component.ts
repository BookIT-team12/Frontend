import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {ReservationDetails} from "../../model/reservation-details.model";
import {ReservationService} from "../../service/reservation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {AccommodationService} from "../../service/accommodation.service";
import {Role} from "../../model/user.model";

@Component({
  selector: 'app-owner-approval',
  templateUrl: './owner-approval.component.html',
  styleUrls: ['./owner-approval.component.css']
})
export class OwnerApprovalComponent implements OnInit{
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

  loadReservations(ownerId:string){
    this.reservationService.getOwnerReservations(ownerId).subscribe(
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

  denyReservation(dto: ReservationDetails){
    const reservation: Reservation = new Reservation(dto.accommodationId, dto.guestEmail, dto.startDate, dto.endDate, dto.numberOfGuests, dto.status, true, dto.price);
    reservation.id = dto.id;
    this.reservationService.denyReservation(reservation).subscribe(
        (data) =>
        {
          if(reservation.valid){
            alert("Deny successful! ")

          } else {
            alert("Deny unsuccessful! :( ")
          }
        }
    );
  }
  approveReservation(dto:ReservationDetails){
    const reservation: Reservation = new Reservation(dto.accommodationId, dto.guestEmail, dto.startDate, dto.endDate, dto.numberOfGuests, dto.status, true, dto.price);
    reservation.id = dto.id;
    this.reservationService.approveReservation(reservation).subscribe(
        (data) =>
        {
          if(reservation.valid){
            alert("Approve successful! ")

          } else {
            alert("Approve unsuccessful! :( ")
          }
        }
    );
  }
  protected readonly Role = Role;
  protected readonly ReservationStatus = ReservationStatus;
}
