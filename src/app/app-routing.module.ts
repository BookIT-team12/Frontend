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
import {UserReportingComponent} from "./account-managment/user-reporting/user-reporting.component";
import {UserBlockingComponent} from "./account-managment/user-blocking/user-blocking.component";
import {VisitedPlacesComponent} from "./reviews/visited-places/visited-places.component";
import {ApartmentReviewComponent} from "./reviews/apartment-review/apartment-review.component";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation_details/:id", component: DetailsComponent},
  {path: "manage", component: UserAccountManagementComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'OWNER', 'GUEST']}},
  {path: "main", component: AccommodationsMainComponent},
  {path: "guest-active-res", component: GuestActiveComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'GUEST']}},
  {path: "add_accommodation", component: AccommodationManagementComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "accommodation-approval", component: AccommodationApprovalComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR']}},
  {path: "owner-approval-res", component: OwnerApprovalComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "accommodation-update/:id", component: AccommodationUpdateComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "owner-accommodations", component: OwnersAccommodationsComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path:"user-reporting", component: UserReportingComponent, canActivate:[AuthGuard],data:{role:['OWNER', 'GUEST']}},
  {path:"user-blocking", component: UserBlockingComponent, canActivate:[AuthGuard],data:{role:['ADMINISTRATOR']}},
  {path:"places-visited", component: VisitedPlacesComponent}, //todo: set authguard at the end!!!
  {path:"apartment-review", component: ApartmentReviewComponent} //todo: set authguard at the end!!!
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
