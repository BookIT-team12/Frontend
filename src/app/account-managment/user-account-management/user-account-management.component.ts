import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
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
  userEmail!:String;

  constructor(private authService:AuthService,private userService:UserService, private fb:FormBuilder) {}


  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    // You can initialize form controls and call fetchUserData here
    this.form = this.fb.group({
      email: ['', Validators.required],
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
        this.user = user;
        this.userEmail=user.email;
        this.form.patchValue({
          email:user.email,
          name: user.name,
          lastName: user.lastName,
          password: user.password,
          confirmPassword: user.confirmPassword,
          phone: user.phone,
          address: user.address,
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
        this.userService.deleteUser(user.email).subscribe(
          (response) => {
            console.log('User deleted successfully', response);
             this.user = undefined;
          },
          (error) => {
            console.error('Error deleting user', error);
          });
      }
    })
  }

  updateAccount(): void {

    if (this.form.valid) {
      const updatedUser: User = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        phone: this.form.value.phone,
        address: this.form.value.address,
        email: this.user?.email || '',
        role:this.user?.role || Role.GUEST,
        isBlocked:false,
        isReported:false
      };

      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    }
  // }
  }

  protected readonly Role = Role;
}

