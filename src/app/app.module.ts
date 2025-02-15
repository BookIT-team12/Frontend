import {APP_INITIALIZER, NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import {AccessControlModuleModule} from "./access-control-module/access-control-module.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from "@angular/material/form-field";
import {BaseModule} from "./base/base.module";
import {AccommodationModule} from "./accommodation/accommodation.module";
import {AccountManagmentModule} from "./account-managment/account-managment.module";
import {MapModule} from "./map/map.module";
import {ReservationModule} from "./reservation/reservation.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {Interceptor} from "./access-control-module/interceptor";
import { UserReportingComponent } from './account-managment/user-reporting/user-reporting.component';
import {ReviewsModule} from "./reviews/reviews.module";
import {ReportsComponent} from "./reports/reports.component";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {RouterModule} from "@angular/router";
import {NotificationModule} from "./notification/notification.module";
import {ServicesModule} from "./services/services.module";
import {CertificateManagementModule} from "./certificate-management/certificate-management.module";
import {KeycloakService} from "./services/keycloak.service";

export function kcFactory(kcService:KeycloakService){
  return ()=>kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent
  ],
  imports: [
    MatSnackBarModule,
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
    ReservationModule,
    ReviewsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterModule,
    NotificationModule,
    CertificateManagementModule,
    ServicesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      deps:[KeycloakService],
      useFactory: kcFactory,
      multi: true,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
