import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./access-control-module/login/login.component";
import {RegisterComponent} from "./access-control-module/register/register.component";
import {DetailsComponent} from "./accommodation/details/details.component";
import {UserAccountManagementComponent} from "./account-managment/user-account-management/user-account-management.component";
import {AccommodationsMainComponent} from "./accommodation/accommodations-main/accommodations-main.component";
import {AccommodationApprovalComponent} from "./accommodation/accommodation-approval/accommodation-approval.component";
import {AccommodationManagementComponent} from "./accommodation/accommodation-management/accommodation-management.component";
import {GuestActiveComponent} from "./reservation/guest-active/guest-active.component";
import {OwnerApprovalComponent} from "./reservation/owner-approval/owner-approval.component";
import {AccommodationUpdateComponent} from "./accommodation/accommodation-update/accommodation-update.component";
import {OwnersAccommodationsComponent} from "./accommodation/owners-accommodations/owners-accommodations.component";
import {AuthGuard} from "./access-control-module/guard/auth.guard";
import {UserReportingComponent} from "./account-managment/user-reporting/user-reporting.component";
import {UserBlockingComponent} from "./account-managment/user-blocking/user-blocking.component";
import {VisitedPlacesComponent} from "./reviews/visited-places/visited-places.component";
import {ApartmentReviewComponent} from "./reviews/apartment-review/apartment-review.component";
import {OwnerReviewComponent} from "./reviews/owner-review/owner-review.component";
import {OwnerReportComponent} from "./reviews/owner-report/owner-report.component";
import {ApartmentReportComponent} from "./reviews/apartment-report/apartment-report.component";
import {AdminApartmentApprovalComponent} from "./reviews/admin-apartment-approval/admin-apartment-approval.component";
import {AdminOwnerApprovalComponent} from "./reviews/admin-owner-approval/admin-owner-approval.component";
import {ReportsComponent} from "./reports/reports.component";
import {AccommodationFavoritesComponent} from "./accommodation/accommodation-favorites/accommodation-favorites.component";
import {A} from "@angular/cdk/keycodes";
import {NotificationOverviewComponent} from "./notification/notification-overview/notification-overview.component";
import {
  GenerateCertificateComponent
} from "./certificate-management/generate-certificate/generate-certificate.component";
import {AllCertificatesComponent} from "./certificate-management/all-certificates/all-certificates.component";
import {MyCertificatesComponent} from "./certificate-management/my-certificates/my-certificates.component";
import {
  HostCertificateRequestComponent
} from "./certificate-management/host-certificate-request/host-certificate-request.component";

const routes: Routes=[
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation_details/:id/:start/:end/:guestsNum", component: DetailsComponent},
  {path: "manage", component: UserAccountManagementComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'OWNER', 'GUEST']}},
  {path: "main", component: AccommodationsMainComponent},
  {path: "guest-active-res", component: GuestActiveComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR', 'GUEST']}},
  {path: "add_accommodation", component: AccommodationManagementComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "accommodation-approval", component: AccommodationApprovalComponent, canActivate: [AuthGuard], data: {role: ['ADMINISTRATOR']}},
  {path: "owner-approval-res", component: OwnerApprovalComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "accommodation-update/:id", component: AccommodationUpdateComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "owner-accommodations", component: OwnersAccommodationsComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path: "user-reporting", component: UserReportingComponent, canActivate:[AuthGuard],data:{role:['OWNER', 'GUEST']}},
  {path: "user-blocking", component: UserBlockingComponent, canActivate:[AuthGuard],data:{role:['ADMINISTRATOR']}},
  {path: "places-visited", component: VisitedPlacesComponent, canActivate:[AuthGuard], data:{role:['GUEST']}},
  {path: "apartment-review/:id", component: ApartmentReviewComponent, canActivate:[AuthGuard], data:{role:['GUEST']}},
  {path: "owner-review/:email", component: OwnerReviewComponent, canActivate:[AuthGuard], data:{role:['GUEST']}},
  {path: "owner-report", component: OwnerReportComponent, canActivate:[AuthGuard], data:{role:['OWNER']}},
  {path: "apartments-report", component: ApartmentReportComponent, canActivate:[AuthGuard], data:{role:['OWNER']}},
  {path: "reviews/apartments/approval", component: AdminApartmentApprovalComponent, canActivate:[AuthGuard], data:{role:['ADMINISTRATOR']}},
  {path: "reviews/owners/approval", component: AdminOwnerApprovalComponent, canActivate:[AuthGuard], data:{role:['ADMINISTRATOR']}},
  {path: "reports", component: ReportsComponent, canActivate: [AuthGuard], data: {role: ['OWNER']}},
  {path:"favorites", component:AccommodationFavoritesComponent, canActivate:[AuthGuard], data:{role:['GUEST']}},
  {path:"notifications", component:NotificationOverviewComponent, canActivate:[AuthGuard],data:{role:['OWNER', 'GUEST']}},
  {path: 'generateCertificate', component: GenerateCertificateComponent },
  { path: 'allCertificates', component: AllCertificatesComponent, canActivate:[AuthGuard],data:{role:['ADMINISTRATOR']}},
  { path: 'myCertificates', component: MyCertificatesComponent },
  {path: 'hostCertificateRequest', component: HostCertificateRequestComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
