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



@NgModule({
  declarations: [
    VisitedPlacesComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterOutlet,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    VisitedPlacesComponent
  ]
})
export class ReviewsModule { }
