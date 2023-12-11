import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})

export class UserAccountManagementComponent {
  hide: boolean = true;
  hideConfirmation: boolean = true;
/*
  userForm:FormGroup;
    currentUser:User;
*/


  profilePicture:File |null=null;


/*  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      // Add other form controls and validations as needed
    });
  }*/

  //TODO:na apply cahnges kreiraj user-a
  applyChanges(){
/*    if(this.userForm.valid){
    console.log('Changes applied!')
    }else{
      console.log('Changes failed!')
    }*/
  }
  deleteAccount(){
    console.log('Account deleted!')
  }

  onFileSelected(event:any){
    this.profilePicture=event.target.files[0] as File;
  }


}
