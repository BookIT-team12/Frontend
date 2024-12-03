import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Role, User} from "../../model/user.model";
import {AuthService} from "../../access-control-module/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUser!: User;

  ngOnInit() {
    // this.router.navigate(['/allCertificates']);
  }
  constructor(private router: Router, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser=user
      } else {
        console.error('User not found');
      }
    });
  }

  get isHost(): boolean {
    return this.currentUser?.role === Role.OWNER;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === Role.ADMINISTRATOR;
  }
}
