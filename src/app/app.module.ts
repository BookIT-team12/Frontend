import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import {AccessControlModuleModule} from "./access-control-module/access-control-module.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { UserAccountManagementComponent } from './account-managment/user-account-management/user-account-management.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from "@angular/material/form-field";
import {BaseModule} from "./base/base.module";
import {AccommodationModule} from "./accommodation/accommodation.module";
import {AccountManagmentModule} from "./account-managment/account-managment.module";
import {MapModule} from "./map/map.module";
import {ReservationModule} from "./reservation/reservation.module";
import {AuthModule} from "./auth/auth.module";
import {Interceptor} from "./auth/interceptor";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccessControlModuleModule,
    HttpClientModule,
    MapModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    BaseModule,
    AccommodationModule,
    BaseModule,
    AccountManagmentModule,
    ReservationModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
