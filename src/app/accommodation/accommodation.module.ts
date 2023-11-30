import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import {BaseModule} from "../base/base.module";



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [
    DetailsComponent
  ]
})
export class AccommodationModule { }
