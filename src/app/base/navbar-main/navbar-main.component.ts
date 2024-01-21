import {Component, OnInit} from '@angular/core';
import {Role} from "../../model/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent implements OnInit {
  userRole: string = Role.GUEST;
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
      case 'home':
        this.router.navigate(['/main']);
        break;
      case 'manage':
        this.router.navigate(['/manage']);
        break;

      case 'favorites':
        this.router.navigate(['/favorites']);
        break;
      case 'logout':
        this.authService.logout().subscribe(() => {
          // Clear user-related data and navigate to the login page
          localStorage.setItem('user',"");
          this.router.navigate(['/login']);
          console.log("Logged out successfully!");
        });
        break;
      case 'places-visited':
        this.router.navigate(['/places-visited']);
        break;
      case 'owner-reporting':
        this.router.navigate(['/user-reporting']);
        break;
      case 'reservations':
        this.router.navigate(['/guest-active-res']);
        break;
      case 'notifications':
        this.router.navigate(['/notifications']);
        break;
      default:
        break;
    }
  }
}
