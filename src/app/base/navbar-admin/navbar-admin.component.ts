import { Component } from '@angular/core';
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  userRole: string = Role.ADMINISTRATOR;

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {
    this.authService.getRoleObservable().subscribe(role=>{
      this.userRole=role;
      console.log(this.userRole);
    })
  }


  menuItemClicked(option: string) {
    console.log(`Selected option: ${option}`);

    // Add logic to navigate based on the selected option
    switch (option) {

      case 'logout':
        this.authService.logout().subscribe(() => {
          // Clear user-related data and navigate to the login page
          this.router.navigate(['/login']);
          console.log("Logged out successfully!");
        });
        break;
        // Add other cases for different options
      default:
        break;
    }
  }

}
