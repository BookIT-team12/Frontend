import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Role, User, UserStatus } from "../../model/user.model";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router'; // Import the Router service
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from "../auth.service";
import { RecaptchaLoaderService } from "../../service/recaptcha-loader";

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  siteKey: string = '6LfPBd4pAAAAAOz2SvGECUrynQQhc_BKbjK68pob'; // Replace with your actual Site Key
  form: FormGroup;
  hide: boolean = true;
  hideConfirmation: boolean = true;
  selectedRole: Role = Role.GUEST;
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phone: string = '';
  confirmPassword: string = '';
  isBlocked: boolean = false;
  isReported: boolean = false;
  recaptchaResponse: string | null = null; // Add a property to hold the recaptcha response

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public router: Router,
    private authService: AuthService,
    private recaptchaLoaderService: RecaptchaLoaderService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.recaptchaLoaderService.loadScript().then(() => {
      (window as any)['onRecaptchaLoadCallback'] = () => {
        grecaptcha.render('recaptchaElement', {
          'sitekey': this.siteKey,
          'callback': (response: string) => {
            this.onCaptchaResolved(response);
          }
        });
      };
    });
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword');
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordDiversityValidator(password: string) {
    const longEnough = password.trim().length > 8;
    const hasDigit = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[@!#\$%\^&\*]/.test(password);

    if (!longEnough) { return 'ERR-LENGTH'; }
    else if (!hasDigit) { return 'ERR-DIGITS'; }
    else if (!hasUpperCase) { return 'ERR-UPPER_CASE'; }
    else if (!hasLowerCase) { return 'ERR-LOWER_CASE'; }
    else if (!hasSpecialChar) { return 'ERR-SPECIAL_CHARS'; }
    else { return 'GOOD'; }
  }

  onCaptchaResolved(response: string): void {
    this.recaptchaResponse = response; // Store the recaptcha response
    console.log('reCAPTCHA response:', response);
  }

  onSubmit() {
    console.log("USAO  U ON SUBMIT!")
    // if (this.form.valid) {
      const recaptchaResponse = grecaptcha.getResponse();
      console.log("ReCaptcha Response u OnSubmit: ", recaptchaResponse)

      if (!recaptchaResponse) {
          alert('Please complete the reCAPTCHA');
          return;
      }

      const passwordReview = this.passwordDiversityValidator(this.password)
      if (passwordReview != "GOOD") {
        switch (passwordReview) {
          case 'ERR-LENGTH':
            alert('Password must be longer than 8 characters');
            return;
          case 'ERR-DIGITS':
            alert('Password must contain at least 1 digit');
            return;
          case 'ERR-UPPER_CASE':
            alert('Password must contain at least 1 uppercase letter');
            return;
          case 'ERR-LOWER_CASE':
            alert('Password must contain at least 1 lowercase letter');
            return;
          case 'ERR-SPECIAL_CHARS':
            alert('Password must contain at least 1 special character');
            return;
        }
      }

        let newUser: User;
        if (this.selectedRole === Role.GUEST) {
          newUser = new User(
            this.name,
            this.lastName,
            this.email,
            this.password,
            this.address,
            this.phone,
            this.selectedRole,
            this.confirmPassword,
            this.isReported,
            this.isBlocked,
            false,
            false,
            false,
            false,
            true,
            UserStatus.PENDING
          );
        } else { // it will be owner then
          newUser = new User(
            this.name,
            this.lastName,
            this.email,
            this.password,
            this.address,
            this.phone,
            this.selectedRole,
            this.confirmPassword,
            this.isReported,
            this.isBlocked,
            true,
            true,
            true,
            true,
            false,
            UserStatus.PENDING
          );
        }


        this.userService.registerUser(newUser, recaptchaResponse).subscribe(
          (result) => {
            console.log('User registered successfully', result);
            this.router.navigate(['/main']);
          },
          (error) => {
            console.error('Error registering user', error);
            if (error.error.errCode === "ERR-TOO_WEAK"){
              alert("Password you want to set is too weak!");
            }
            else {
              alert("Unkown error, check console for more details...")
            }
          }
        );
    // }
  }

  protected readonly Role = Role;
}
