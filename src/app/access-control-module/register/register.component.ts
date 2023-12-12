import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide: boolean = true;
  hideConfirmation: boolean = true;

  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phone: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    // Create a new User object
    const newUser = new User(
        this.name,
        this.lastName,
        this.email,
        this.password,
        this.address,
        this.phone,
        Role.USER,
        this.confirmPassword
    );
    console.log(newUser)

    this.userService.registerUser(newUser).subscribe(
        (result) => {
          // Handle success, if needed
          console.log('User registered successfully', result);
        },
        (error) => {
          // Handle error, if needed
          console.error('Error registering user', error);
        }
    );

  }
}
