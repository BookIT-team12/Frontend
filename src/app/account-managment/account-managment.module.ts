import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserAccountManagementComponent} from "./user-account-management/user-account-management.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BaseModule} from "../base/base.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import { UserReportingComponent } from './user-reporting/user-reporting.component';
import { UserBlockingComponent } from './user-blocking/user-blocking.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    UserAccountManagementComponent,
    UserReportingComponent,
    UserBlockingComponent
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
        NgOptimizedImage,
        ReactiveFormsModule,
        MatGridListModule,
        MatCheckboxModule

    ], exports: [
    UserAccountManagementComponent
  ]
})
export class AccountManagmentModule { }
