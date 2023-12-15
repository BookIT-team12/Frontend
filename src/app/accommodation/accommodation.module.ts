import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import {BaseModule} from "../base/base.module";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";
import { AccommodationsMainComponent } from './accommodations-main/accommodations-main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import { AccommodationManagementComponent } from './accommodation-management/accommodation-management.component';
import {MatCardModule} from "@angular/material/card";
import { HttpClientModule } from '@angular/common/http';
import {MapModule} from "../map/map.module";
import {MapComponent} from "../map/map.component";
import { AccommodationApprovalComponent } from './accommodation-approval/accommodation-approval.component';
import { AccommodationApprovalCardComponent } from './accommodation-approval-card/accommodation-approval-card.component';
import {RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    DetailsComponent,
    AccommodationsMainComponent,
    AccommodationManagementComponent,
/*
    MapComponent
*/
    AccommodationsMainComponent,
    AccommodationApprovalComponent,
    AccommodationApprovalCardComponent
  ],
    imports: [
        CommonModule,
        BaseModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatSidenavModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MapModule,
        MatToolbarModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSliderModule,
        MatCardModule,
        HttpClientModule,
        RouterOutlet,

    ],
  exports: [
    DetailsComponent,
    AccommodationsMainComponent,
    AccommodationApprovalComponent,
    AccommodationManagementComponent

  ]
})
export class AccommodationModule { }
