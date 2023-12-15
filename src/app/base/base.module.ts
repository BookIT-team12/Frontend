import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import { NavbarOwnerComponent } from './navbar-owner/navbar-owner.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarNonRegisteredComponent } from './navbar-non-registered/navbar-non-registered.component';
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarOwnerComponent,
    NavbarAdminComponent,
    NavbarNonRegisteredComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ], exports: [
    NavbarComponent
  ]
})
export class BaseModule { }
