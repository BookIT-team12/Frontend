import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllCertificatesComponent } from './all-certificates/all-certificates.component';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HostCertificateRequestComponent } from './host-certificate-request/host-certificate-request.component';



@NgModule({
  declarations: [
    GenerateCertificateComponent,
    NavbarComponent,
    AllCertificatesComponent,
    MyCertificatesComponent,
    HostCertificateRequestComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GenerateCertificateComponent,
    NavbarComponent,
    AllCertificatesComponent,
    MyCertificatesComponent,
    HostCertificateRequestComponent
  ]
})

export class CertificateManagementModule { }
