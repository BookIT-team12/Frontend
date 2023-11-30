import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserAccountManagementComponent} from "./user-account-management/user-account-management.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BaseModule} from "../base/base.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    UserAccountManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    BaseModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    NgOptimizedImage

  ], exports: [
    UserAccountManagementComponent
  ]
})
export class AccountManagmentModule { }
