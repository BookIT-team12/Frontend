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
import {AuthGuard} from "./access-control-module/guard/auth.guard";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation_details", component: DetailsComponent},
  {path: "manage", component: UserAccountManagementComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'GUEST']}},
  {path: "main", component: AccommodationsMainComponent},
  {path: "guest-active-res", component: GuestActiveComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'GUEST']}},
  {path: "add_accommodation", component: AccommodationManagementComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'OWNER']}},
  {path: "accommodation-approval", component: AccommodationApprovalComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR']}},
  {path: "owner-approval-res", component: OwnerApprovalComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR']}},
  {path: "accommodation-update/:id", component: AccommodationUpdateComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'OWNER']}},
  {path: "owner-accommodations", component: OwnersAccommodationsComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'OWNER']}}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
