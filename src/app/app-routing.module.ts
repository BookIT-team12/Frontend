import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./access-control-module/login/login.component";
import {RegisterComponent} from "./access-control-module/register/register.component";

import {
  UserAccountManagementComponent
} from "./account-managment/user-account-management/user-account-management.component";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "manage", component: UserAccountManagementComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
