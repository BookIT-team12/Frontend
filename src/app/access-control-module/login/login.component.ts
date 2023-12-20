import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthResponse, AuthService} from "../auth.service";
import {Login} from "../../model/login.model";
import {Role} from "../../model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  userRole: string = Role.UNKNOWN;


  constructor(private authService: AuthService,
              private router: Router) {

  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login(): void {
    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "test",
        password: this.loginForm.value.password || "test"
      }

      this.userRole = this.authService.getRole();
      console.log("USER ROLE:", this.userRole);


      this.authService.login(login).subscribe({

        next: (response: AuthResponse) => {
          console.log(response)
          console.log(response.accessToken)
          localStorage.setItem('user', response.accessToken);
          this.authService.setUser()
          this.authService.setUserDetails()
          this.router.navigate(['main'])
        }
      })
    }
    else{
      alert('Bad credentials');
    }
  }

  hide:boolean=true;
  email: string = '';
  password: string = '';

  protected readonly Role = Role;
}
