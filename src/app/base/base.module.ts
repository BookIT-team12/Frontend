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
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { NavbarNonRegisteredMainComponent } from './navbar-non-registered-main/navbar-non-registered-main.component';
import { NavbarOwnerMainComponent } from './navbar-owner-main/navbar-owner-main.component';
import { NavbarAdminMainComponent } from './navbar-admin-main/navbar-admin-main.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarOwnerComponent,
    NavbarAdminComponent,
    NavbarNonRegisteredComponent,
    NavbarMainComponent,
    NavbarNonRegisteredMainComponent,
    NavbarOwnerMainComponent,
    NavbarAdminMainComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ], exports: [
    NavbarComponent,
    NavbarOwnerComponent,
    NavbarAdminComponent,
    NavbarNonRegisteredComponent,
    NavbarMainComponent,
    NavbarNonRegisteredMainComponent,
    NavbarOwnerMainComponent,
    NavbarAdminMainComponent
  ]
})
export class BaseModule { }
