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

}
