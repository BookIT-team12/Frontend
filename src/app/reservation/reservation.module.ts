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

@NgModule({
  declarations: [
    GuestActiveComponent,
    GuestActiveCardComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[
    GuestActiveComponent
  ]
})
export class ReservationModule { }
