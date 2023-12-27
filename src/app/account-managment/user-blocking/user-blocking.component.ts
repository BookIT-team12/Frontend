import { Component } from '@angular/core';
import {Role, User} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user-blocking',
  templateUrl: './user-blocking.component.html',
  styleUrls: ['./user-blocking.component.css']
})
export class UserBlockingComponent {

  users: User[] = [];
  userRole: Role | undefined;
  reporterID: string | null = null;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        // Assuming user ID is in the 'email' field, replace it with the correct field
        this.reporterID = user.email;
        this.getUsersForBlocking();
      }
    });
  }

  getUsersForBlocking(): void {
    if (this.reporterID) {
      this.userService.getUsersforBlocking().subscribe(
        users => this.users = users,
        error => console.error('Error fetching users that can be blocked!', error)
      );
    }
  }

  blockUser(reportedID: string) {
    this.userService.blockUser(reportedID).subscribe(
      () => {
        // Refresh the user list after reporting
        this.getUsersForBlocking();

      },
      error => console.error('Error reporting user:', error)
    );
  }

  protected readonly Role = Role;
}
