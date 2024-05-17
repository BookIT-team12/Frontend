import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthResponse, AuthService } from "../auth.service";
import { Login } from "../../model/login.model";
import { Role } from "../../model/user.model";
import { RecaptchaLoaderService } from "../../service/recaptcha-loader";

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recaptchaFormControl = new FormControl('', Validators.required);
  loginForm: FormGroup;
  userRole: string = Role.UNKNOWN;
  siteKey: string = '6LfPBd4pAAAAAOz2SvGECUrynQQhc_BKbjK68pob';
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private recaptchaLoaderService: RecaptchaLoaderService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.recaptchaLoaderService.loadScript().then(() => {
      grecaptcha.render('recaptchaElement', {
        'sitekey': this.siteKey,
        'callback': (response: string) => {
          this.onCaptchaResolved(response);
        }
      });
    });
  }

  onCaptchaResolved(response: string): void {
    // Set the resolved reCAPTCHA token to the form control
    this.recaptchaFormControl.setValue(response);
  }

  login(): void {
    if (this.loginForm.valid) {
      // Get Google ReCaptcha Score
      const captchaToken = grecaptcha.getResponse();
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || "",
        recaptchaToken: captchaToken || ""

      };

      console.log("ReCaptcha iz LocalStorage-a: ", login.recaptchaToken)

      // @ts-ignore
      this.authService.login(login, login.recaptchaToken).subscribe({
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
      });
    } else {
      alert('Bad credentials');
    }
  }

  protected readonly Role = Role;
}
