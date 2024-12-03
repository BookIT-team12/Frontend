import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestActiveComponent } from './guest-active/guest-active.component';
import {BaseModule} from "../base/base.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { GuestActiveCardComponent } from './guest-active-card/guest-active-card.component';
import {MatCardModule} from "@angular/material/card";
import { OwnerApprovalComponent } from './owner-approval/owner-approval.component';
import { OwnerApprovalCardComponent } from './owner-approval-card/owner-approval-card.component';
import {RouterOutlet} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    GuestActiveComponent,
    GuestActiveCardComponent,
    OwnerApprovalComponent,
    OwnerApprovalCardComponent
  ],
    imports: [
        CommonModule,
        BaseModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        RouterOutlet,
        MatGridListModule,
        MatSidenavModule,
        FormsModule
    ],
  exports:[
    GuestActiveComponent,
    OwnerApprovalComponent
  ]
})
export class ReservationModule { }
