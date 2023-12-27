import { Component, OnInit } from '@angular/core';
import { Role, User } from '../../model/user.model';
import { AuthService } from '../../access-control-module/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-reporting',
  templateUrl: './user-reporting.component.html',
  styleUrls: ['./user-reporting.component.css']
})
export class UserReportingComponent implements OnInit {

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
        this.getReportableUsers();
      }
    });
  }

  getReportableUsers(): void {
    if (this.reporterID) {
      this.userService.getReportableUsers(this.reporterID).subscribe(
        users => this.users = users,
        error => console.error('Error fetching reportable users:', error)
      );
    }
  }

  reportUser(reportedID: string) {
      this.userService.reportUser(reportedID).subscribe(
        () => {
          // Refresh the user list after reporting
          this.getReportableUsers();

        },
        error => console.error('Error reporting user:', error)
      );
  }

  protected readonly Role = Role;
}
