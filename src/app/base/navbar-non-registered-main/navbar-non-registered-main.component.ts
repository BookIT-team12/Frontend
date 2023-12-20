import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../access-control-module/auth.service";
import {Role} from "../../model/user.model";

@Component({
  selector: 'app-navbar-non-registered-main',
  templateUrl: './navbar-non-registered-main.component.html',
  styleUrls: ['./navbar-non-registered-main.component.css']
})
export class NavbarNonRegisteredMainComponent implements OnInit {
  userRole: string = Role.UNKNOWN;
  constructor(private router: Router, private authService:AuthService) {}
  ngOnInit() {
    this.authService.getRoleObservable().subscribe(role=>{
      this.userRole=role;
      console.log(this.userRole);
    })
  }
}
