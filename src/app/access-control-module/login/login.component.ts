import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthResponse, AuthService} from "../auth.service";
import {Login} from "../../model/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
      alert(login.email)
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          console.log(response)
          console.log(response.accessToken)
          alert(response.accessToken)
          localStorage.setItem('user', response.accessToken);
          this.authService.setUser()
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

}
