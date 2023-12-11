import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestActiveComponent } from './guest-active/guest-active.component';
import {BaseModule} from "../base/base.module";



@NgModule({
  declarations: [
    GuestActiveComponent
  ],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports:[
    GuestActiveComponent
  ]
})
export class ReservationModule { }
