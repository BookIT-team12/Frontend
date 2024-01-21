import {Component} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router'; // Import the Router service
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthResponse, AuthService} from "../auth.service";
import {Login} from "../../model/login.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
  isBlocked:boolean=false;
  isReported:boolean=false;

  constructor(private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar, private router:Router, private authService:AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
    }, {validators: this.passwordMatchValidator});

  }
  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl(){
    return this.form.get('confirmPassword');

  }
  passwordMatchValidator(control: AbstractControl) {
    // @ts-ignore
    const password = control.get('password').value;
    // @ts-ignore
    const confirmPassword = control.get('confirmPassword').value;

    return password === confirmPassword ? null : {passwordMismatch: true};
  }


  onSubmit() {
    // Create a new User object
    console.log(this.password)
/*
    if (this.form.valid) {
*/
      let newUser: User;
      if ((this.selectedRole as Role) === Role.GUEST){
          newUser = new User(
              this.name,
              this.lastName,
              this.email,
              this.password,
              this.address,
              this.phone,
              this.selectedRole as Role,  // Set the selected role
              // this.Role.ADMINISTRATOR, //
              this.confirmPassword,
              this.isReported,
              this.isBlocked,
              false,
              false,
              false,
              false,
              true
          );
      } else {  //it will be owner then
          newUser = new User(
              this.name,
              this.lastName,
              this.email,
              this.password,
              this.address,
              this.phone,
              this.selectedRole as Role,  // Set the selected role
              // this.Role.ADMINISTRATOR, //
              this.confirmPassword,
              this.isReported,
              this.isBlocked,
              true,
              true,
              true,
              true,
              false
          );
      }
    console.log('User: ', newUser)

    this.userService.registerUser(newUser).subscribe(
        (result) => {
          // Handle success, if needed
          console.log('User registered successfully', result);
  //        this.showSnackBar('Registration successful');
          const login: Login = {
            email: newUser.email || "test",
            password: newUser.password || "test"
          }
          this.authService.login(login).subscribe({
            next: (response: AuthResponse) => {
              console.log(response)
              console.log(response.accessToken)
              localStorage.setItem('user', response.accessToken);
              this.authService.setUser()
              this.authService.setUserDetails()
              this.router.navigate(['main'])
            }
          });
        },
        (error) => {
          // Handle error, if needed
 //         this.showSnackBar('Error registering user');
          console.error('Error registering user', error);
        }
    );

/*
  }
*/
}

  protected readonly Role = Role;
    /*
      }
    */
  }
  // private showSnackBar(message:string){
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000, // Adjust the duration as needed
  //     verticalPosition: 'bottom', // You can also use 'bottom'
  //     panelClass: 'snackbar-success' // Add a custom CSS class for styling
  //   });


