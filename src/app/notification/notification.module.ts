import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationOverviewComponent } from './notification-overview/notification-overview.component';
import {BaseModule} from "../base/base.module";
import {RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    NotificationOverviewComponent
  ],
    imports: [
        CommonModule,
        BaseModule,
        RouterOutlet,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule
    ], exports: [
        NotificationOverviewComponent
    ]
})
export class NotificationModule { }
