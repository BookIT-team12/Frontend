import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../access-control-module/auth.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation, ReservationStatus} from "../../model/reservation.model";
import {AccommodationService} from "../../service/accommodation.service";
import {ReservationDetails} from "../../model/reservation-details.model";
import {Role} from "../../model/user.model";
import {CustomNotification} from "../../model/notification.model";
import {NotificationService} from "../../service/notification.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-guest-active',
  templateUrl: './guest-active.component.html',
  styleUrls: ['./guest-active.component.css']
})
export class GuestActiveComponent implements OnInit {
  reservations: Reservation[]=[];
  reservationDetails: ReservationDetails[]=[];
  userRole?: Role;
  status: string = "";
  searchBar: string = "";
  currentUser?:string;
  constructor(private reservationService: ReservationService, private authService:AuthService, private accommodationService: AccommodationService, private notificationService:NotificationService) {
  }

  ngOnInit(): void {
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadReservations(user.email);
        this.userRole = user.role;
        this.currentUser = user.email;
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
                  this.reservationDetails.push(new ReservationDetails(res, accommodation.first.name, accommodation.first.location.address, accommodation.first.ownerEmail));
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
    const reservation: Reservation = new Reservation(dto.accommodationId, dto.guestEmail, dto.startDate, dto.endDate, dto.numberOfGuests, dto.status, true, dto.price);
    reservation.id = dto.id;
    this.reservationService.cancelReservation(reservation).subscribe(
        (data) =>
        {
          console.log(data);
          if(data.valid){
            const message: string = "Reservation has been cancelled for the accommodation: " + dto.accommodationName +
                ". From: " + dto.startDate.toString().substring(8, 10) + "-" + dto.startDate.toString().substring(5, 7) + "-"  + dto.startDate.toString().substring(0, 4) +
                " To: " + dto.endDate.toString().substring(8, 10) + "-"  + dto.endDate.toString().substring(5, 7) + "-"  + dto.endDate.toString().substring(0, 4);
            const notification: CustomNotification = new CustomNotification(
                dto.accommodationOwner,
                message
            );
            this.notificationService.createNotification(notification).subscribe(
                (data:CustomNotification) => {
                  if(data){console.log("Notification sent! ");}
                  else{console.log("Error sending notification! ");}
                });
            alert("Cancel successful! ")
          } else {
            alert("Cancel unsuccessful, you cant cancel reservations in this time frame")
          }
        }
    );
  }
  applyFilters(){
    let params = new HttpParams();
    console.log(this.searchBar);
    console.log(this.status);
    params = params.set('searchBar', this.searchBar);
    params = params.set('status', this.status)
    this.reservationService.searchReservations(params).subscribe(
        (data) => {
          console.log(data.length);
          this.reservations = data;
          this.reservationDetails = []
          for(const res of data){
            this.accommodationService.getAccommodationById(res.accommodationId).subscribe(accommodation =>{
              if(accommodation && res.guestEmail==this.currentUser){
                this.reservationDetails.push(new ReservationDetails(res, accommodation.first.name, accommodation.first.location.address, accommodation.first.ownerEmail));
              }
            });
          }
        }
    )
  }
  protected readonly Role = Role;
  protected readonly ReservationStatus = ReservationStatus;
}
