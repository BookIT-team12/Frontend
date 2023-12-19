import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../access-control-module/auth.service";
import {Role} from "../../model/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

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
      // Add other cases for different options
      default:
        break;
    }
  }
}
