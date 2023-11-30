import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import {BaseModule} from "../base/base.module";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";




@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  exports: [
    DetailsComponent
  ]
})
export class AccommodationModule { }
