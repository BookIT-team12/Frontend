import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthResponse, AuthService} from "../auth.service";
import {Login} from "../../model/login.model";
import {Role} from "../../model/user.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

      this.userRole = this.authService.getRole(); //nepotrebna linija?

      this.authService.login(login).subscribe({

        next: (response: AuthResponse) => {
          if (!response) {
            alert("Account not verified yet!!!");
          } else {
            localStorage.setItem('user', response.accessToken);
            this.authService.setUser();
            this.authService.setUserDetails();
            this.router.navigate(['main']);
          }
        },
        error: (error) => {
          alert('Bad credentials or account not verified yet');
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
