import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

import {AuthService} from "../../access-control-module/auth.service";
@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})

export class UserAccountManagementComponent implements OnInit {
  hide: boolean = true;
  hideConfirmation: boolean = true;
  user: User | undefined;
  form!:FormGroup
  userRole!: Role;

  constructor(private authService:AuthService,private userService:UserService, private fb:FormBuilder, private snackBar:MatSnackBar) {}


  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    // You can initialize form controls and call fetchUserData here
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.authService.getCurrentUser().subscribe(user=>{
      if (user) {
        this.user = user;
        this.fetchUserData(user.email);
      }
    })

  }

  fetchUserData(email: string): void {
    this.userService.getUser(email).subscribe(
      (user) => {
        // Update the user property with fetched data
        this.user = user;
        console.log(user)
        // Patch the form controls with user data
        this.form.patchValue({
          name: user.name,
          lastName: user.lastName,
          password: user.password,
          confirmPassword: user.confirmPassword,
          phone: user.phone,
          address: user.address,
          role:user.role,
          isBlocked:user.isBlocked,
          isReported:user.isReported
        });
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
  deleteAccount():void{
    this.authService.getCurrentUser().subscribe(user=>{
      if (user) {
        this.user = user;
        this.userService.deleteUser(user.email).subscribe(
          (response) => {
            console.log('User deleted successfully', response);
          },
          (error) => {
            console.error('Error deleting user', error);
          });
      }
    })
  }


  updateAccount(): void {
    // Check if the form is valid before proceeding
    if (this.form.valid) {
      const updatedUser: User = {
        // Include any other fields you may want to update
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        phone: this.form.value.phone,
        address: this.form.value.address,
        email: this.user?.email || '', // Ensure email is set
        role:this.user!.role,
        isBlocked:false,
        isReported:false
      };

      // Call the update user method
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  protected readonly Role = Role;
}

