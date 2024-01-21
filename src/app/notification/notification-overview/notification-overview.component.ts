import {Component, OnInit} from '@angular/core';
import {Role} from "../../model/user.model";
import {ReservationService} from "../../service/reservation.service";
import {AuthService} from "../../access-control-module/auth.service";
import {AccommodationService} from "../../service/accommodation.service";
import {NotificationService} from "../../service/notification.service";
import {CustomNotification} from "../../model/notification.model";
import {ReservationStatus} from "../../model/reservation.model";

@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.css']
})
export class NotificationOverviewComponent implements OnInit {
  userRole?: Role;
  notifications:CustomNotification[] = [];
  constructor(private authService:AuthService, private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    this.authService.userAccount$.subscribe(user => {
      if (user) {
        this.loadNotifications(user.email);
        this.userRole = user.role;
      }
    });
  }
  loadNotifications(guestId:string){
    this.notificationService.getGuestNotifications(guestId).subscribe(
        (data) => {
          this.notifications = data;
        }
    );
  }
  // formatDate(date:Date){
  //   const dateString
  // }
  protected readonly Role = Role;
  protected readonly ReservationStatus = ReservationStatus;
}
