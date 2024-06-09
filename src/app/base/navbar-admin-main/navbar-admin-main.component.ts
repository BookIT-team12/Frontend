import { Component } from '@angular/core';
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-navbar-admin-main',
  templateUrl: './navbar-admin-main.component.html',
  styleUrls: ['./navbar-admin-main.component.css']
})
export class NavbarAdminMainComponent {

  userRole: string = Role.ADMINISTRATOR;

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {
    this.authService.getRoleObservable().subscribe(role=>{
      this.userRole=role;
      console.log(this.userRole);
    })
  }

  openSecondApp() {
    window.open('http://localhost:4201/', '_blank');
  }


  menuItemClicked(option: string) {
    console.log(`Selected option: ${option}`);

    // Add logic to navigate based on the selected option
    switch (option) {

      case 'logout':
        this.authService.logout();
        // this.authService.logout().subscribe(() => {
        //   // Clear user-related data and navigate to the login page
        //   localStorage.setItem('user',"");
        //   this.router.navigate(['/login']);
        //   console.log("Logged out successfully!");
        // });
        break;
        // Add other cases for different options
      case 'reviews/apartments/approval':
        this.router.navigate(['reviews/apartments/approval']);
        break;
      case 'reviews/owners/approval':
        this.router.navigate(['reviews/owners/approval']);
        break;
      case 'get-all-certificates':
        this.router.navigate(['/allCertificates']);
        break;
      case 'generate-certificate':
        this.router.navigate(['/generateCertificate']);
        break;
      default:
        break;
    }
  }

}
