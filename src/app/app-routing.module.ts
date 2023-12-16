import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./access-control-module/login/login.component";
import {RegisterComponent} from "./access-control-module/register/register.component";
import {DetailsComponent} from "./accommodation/details/details.component";
import {UserAccountManagementComponent} from "./account-managment/user-account-management/user-account-management.component";
import {AccommodationsMainComponent} from "./accommodation/accommodations-main/accommodations-main.component";
import {AccommodationApprovalComponent} from "./accommodation/accommodation-approval/accommodation-approval.component";
import {
  AccommodationManagementComponent
} from "./accommodation/accommodation-management/accommodation-management.component";
import {GuestActiveComponent} from "./reservation/guest-active/guest-active.component";
import {OwnerApprovalComponent} from "./reservation/owner-approval/owner-approval.component";
import {AccommodationUpdateComponent} from "./accommodation/accommodation-update/accommodation-update.component";
import {OwnersAccommodationsComponent} from "./accommodation/owners-accommodations/owners-accommodations.component";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation_details", component: DetailsComponent},
  {path: "manage", component: UserAccountManagementComponent},
  {path: "main", component: AccommodationsMainComponent},
  {path: "guest-active-res", component: GuestActiveComponent},
  {path: "add_accommodation", component: AccommodationManagementComponent},
  {path: "accommodation-approval", component: AccommodationApprovalComponent},
  {path: "owner-approval-res", component: OwnerApprovalComponent},
  {path: "accommodation-update/:id", component: AccommodationUpdateComponent},
  {path: "owner-accommodations", component: OwnersAccommodationsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
