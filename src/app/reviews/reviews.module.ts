import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitedPlacesComponent } from './visited-places/visited-places.component';
import {BaseModule} from "../base/base.module";
import {RouterOutlet} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { ApartmentReviewComponent } from './apartment-review/apartment-review.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { OwnerReviewComponent } from './owner-review/owner-review.component';
import { OwnerReportComponent } from './owner-report/owner-report.component';
import { ApartmentReportComponent } from './apartment-report/apartment-report.component';
import { AdminNewApprovalComponent } from './admin-new-approval/admin-new-approval.component';
import { AdminApartmentApprovalComponent } from './admin-apartment-approval/admin-apartment-approval.component';
import { AdminOwnerApprovalComponent } from './admin-owner-approval/admin-owner-approval.component';



@NgModule({
  declarations: [
    VisitedPlacesComponent,
    ApartmentReviewComponent,
    OwnerReviewComponent,
    OwnerReportComponent,
    ApartmentReportComponent,
    AdminNewApprovalComponent,
    AdminApartmentApprovalComponent,
    AdminOwnerApprovalComponent
  ],
    imports: [
        CommonModule,
        BaseModule,
        RouterOutlet,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule
    ],
  exports: [
    VisitedPlacesComponent
  ]
})
export class ReviewsModule { }
