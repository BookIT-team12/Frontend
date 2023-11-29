import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/User";

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})

export class UserAccountManagementComponent {

/*
  userForm:FormGroup;
    currentUser:User;
*/


  name: string = '';
  email: string = '';
  surname:string ='';
  oldPassword:string = '';
  newPassword:string = '';
  address:string = '';
  profilePicture:File |null=null;
  phone:string = '';


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
