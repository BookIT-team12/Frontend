import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./access-control-module/login/login.component";
import {RegisterComponent} from "./access-control-module/register/register.component";
import {DetailsComponent} from "./accommodation/details/details.component";
import {UserAccountManagementComponent} from "./account-managment/user-account-management/user-account-management.component";
import {AccommodationsMainComponent} from "./accommodation/accommodations-main/accommodations-main.component";
import {AccommodationApprovalComponent} from "./accommodation/accommodation-approval/accommodation-approval.component";
import {GuestActiveComponent} from "./reservation/guest-active/guest-active.component";
import {OwnerApprovalComponent} from "./reservation/owner-approval/owner-approval.component";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation_details", component: DetailsComponent},
  {path: "manage", component: UserAccountManagementComponent},
  {path: "main", component: AccommodationsMainComponent},
  {path: "accommodation-approval", component: AccommodationApprovalComponent},
  {path: "guest-active-res", component: GuestActiveComponent},
  {path: "owner-approval-res", component: OwnerApprovalComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
