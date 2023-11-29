import { Component } from '@angular/core';

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})
export class UserAccountManagementComponent {
  name: string = '';
  email: string = '';
  surname:string ='';
  oldPassword:string = '';
  newPassword:string = '';
  address:string = '';
  profilePicture:File |null=null;
  phone:string = '';

  applyChanges(){
    console.log('Changes applied!')
  }
  deleteAccount(){
    console.log('Account deleted!')
  }

  onFileSelected(event:any){
    this.profilePicture=event.target.files[0] as File;
  }


}
