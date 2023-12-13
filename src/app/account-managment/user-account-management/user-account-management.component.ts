import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";

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

  //TODO:IZMENITI DA NE BUDE UNAPRED PROSLEDJEN STRING, NEGO USER ID
  constructor(private userService:UserService, private fb:FormBuilder) {}

  ngOnInit(): void {
    // You can initialize form controls and call fetchUserData here
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.fetchUserData('pera');
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
        });
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  updateAccount(){}
}
