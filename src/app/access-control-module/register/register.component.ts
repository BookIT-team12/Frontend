import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
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

  constructor(private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar) {
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

  get confirmPasswordControl() {
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
    const newUser = new User(
      this.name,
      this.lastName,
      this.email,
      this.password,
      this.address,
      this.phone,
      this.selectedRole as Role,  // Set the selected role
      this.confirmPassword
    );
    console.log('User: ', newUser)

    this.userService.registerUser(newUser).subscribe(
      (result) => {
        // Handle success, if needed
        console.log('User registered successfully', result);
        this.showSnackBar('Registration successful');
      },
      (error) => {
        // Handle error, if needed
        console.error('Error registering user', error);
        this.showSnackBar('Error registering user');
      }
    );
    /*
      }
    */
  }
  private showSnackBar(message:string){
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      verticalPosition: 'bottom', // You can also use 'bottom'
      panelClass: 'snackbar-success' // Add a custom CSS class for styling
    });
  }
}
