import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import {AccessControlModuleModule} from "./access-control-module/access-control-module.module";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { UserAccountManagementComponent } from './account-managment/user-account-management/user-account-management.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from "@angular/material/form-field";
import {BaseModule} from "./base/base.module";
import {AccountManagmentModule} from "./account-managment/account-managment.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccessControlModuleModule,
    HttpClientModule,
    BaseModule,
    AccountManagmentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
