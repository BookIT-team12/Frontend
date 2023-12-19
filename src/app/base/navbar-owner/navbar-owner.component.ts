import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Role} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-navbar-owner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.css']
})
export class NavbarOwnerComponent implements OnInit {

  userRole: string = Role.OWNER;

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
      // Add other cases for different options
      case 'owner-accommodations':
        this.router.navigate(['/owner-accommodations']);
        break;
      case 'owner-approval-res':
        this.router.navigate(['/owner-approval-res']);
        break;
      default:
        break;
    }
  }

}
