import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountManagementComponent} from "./user-account-management/user-account-management.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BaseModule} from "../base/base.module";



@NgModule({
  declarations: [
    UserAccountManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    BaseModule

  ], exports: [
    UserAccountManagementComponent
  ]
})
export class AccountManagmentModule { }
