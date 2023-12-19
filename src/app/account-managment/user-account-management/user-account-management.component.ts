import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private userService:UserService, private fb:FormBuilder, private snackBar: MatSnackBar) {}

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

    this.fetchUserData('pera@gmail.com');    //TODO:IZMENITI DA NE BUDE UNAPRED PROSLEDJEN STRING, NEGO USER ID

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
          role:user.role
        });
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
  deleteAccount():void{
/*    if (this.user?.email) {*/
    this.userService.deleteUser('pera@gmail.com').subscribe(  //TODO:IZMENITI DA NE BUDE UNAPRED PROSLEDJEN STRING, NEGO DOBAVLJEN USER ID ---> this.user.email
      (response) => {
        console.log('User deleted successfully', response);
        this.showSnackBar('User deleted successfully!');


      },
      (error) => {
        console.error('Error deleting user', error);
        this.showSnackBar('Error! The user cannot be deleted!');

      }
    );
  }


  private showSnackBar(message:string){
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      verticalPosition: 'bottom', // You can also use 'bottom'
      panelClass: 'snackbar-success' // Add a custom CSS class for styling
    });
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
        role:this.user!.role
      };

      // Call the update user method
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.showSnackBar('User updated successfully!');

        },
        (error) => {
          console.error('Error updating user', error);
          this.showSnackBar('Error! User update failed!');

        }
      );
    }
  }
}

