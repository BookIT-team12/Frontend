import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import { UserAccountManagementComponent } from './user-account-management/user-account-management.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
@NgModule({
  declarations: [
    AppComponent,
    UserAccountManagementComponent,
    NavbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
