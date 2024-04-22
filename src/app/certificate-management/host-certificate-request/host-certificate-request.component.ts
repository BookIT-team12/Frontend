import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { HostCertificateRequest } from '../../model/host-certificate-request';
import { HostRequestService } from '../../services/host-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-host-certificate-request',
  templateUrl: './host-certificate-request.component.html',
  styleUrls: ['./host-certificate-request.component.css']
})
export class HostCertificateRequestComponent implements OnInit {
  certificateForm!: FormGroup;
  user: User | undefined;
  isCA!: boolean;
  isDS!: boolean;
  isKE!: boolean;
  isKCS!: boolean;
  isCRLS!: boolean;

  constructor(private formBuilder: FormBuilder, private hostRequestService: HostRequestService,
              private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isCA = true;
    this.isDS = false;
    this.isKE = false;
    this.isKCS = false;
    this.isCRLS = false;
    this.certificateForm = this.formBuilder.group({
      email: ['', Validators.required],
      subjectO: ['', Validators.required],
      subjectOU: ['', Validators.required],
      subjectCountry: ['', Validators.required],
      isCA: ['', Validators.required],
      isDS: ['', Validators.required],
      isKE: ['', Validators.required],
      isKCS: ['', Validators.required],
      isCRLS: ['', Validators.required]
    });

    this.userService.getCurrentUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user?.email);
      this.certificateForm?.get('email')?.setValue(this.user?.email);
    });
  }

  createCertificate() {
    console.log("udje")
    // if (this.certificateForm?.invalid) {
    //   console.log("Invalid form");
    //   return;
    // }

    var certificateRequest: HostCertificateRequest = {
      hostUsername: this.user?.email,
      organisation: this.certificateForm?.get('subjectO')?.value,
      organisationUnit: this.certificateForm?.get('subjectOU')?.value,
      country: this.certificateForm?.get('subjectCountry')?.value,
      isCA: this.isCA,
      isDS: this.isDS,
      isKE: this.isKE,
      isKCS: this.isKCS,
      isCRLS: this.isCRLS,
    };

    console.log("SERTIFIKAT ZAHTEV:", certificateRequest);
    this.hostRequestService.createCertificateRequest(certificateRequest).subscribe(() => {
      this.snackBar.open("Request is created successfully.", 'Close', {
        duration: 3000,
      });
    });
  }
}
