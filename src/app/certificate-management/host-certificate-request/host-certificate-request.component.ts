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

  constructor(private formBuilder: FormBuilder, private hostRequestService: HostRequestService,
              private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.certificateForm = this.formBuilder.group({
      email: ['', Validators.required],
      subjectO: ['', Validators.required],
      subjectOU: ['', Validators.required],
      subjectCountry: ['', Validators.required],
      isCA: [true, Validators.required],
      isDS: [true, Validators.required],
      isKE: [true, Validators.required],
      isKCS: [true, Validators.required],
      isCRLS: [true, Validators.required]
    });

    this.userService.getCurrentUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user?.email);
      this.certificateForm?.get('email')?.setValue(this.user?.email);
    });
  }

  createCertificate() {

    if (this.certificateForm?.invalid) {
      console.log("Invalid form");
      return;
    }

    var certificateRequest: HostCertificateRequest = {
      email: this.user?.email,
      organisation: this.certificateForm?.get('subjectO')?.value,
      organisationUnit: this.certificateForm?.get('subjectOU')?.value,
      country: this.certificateForm?.get('subjectCountry')?.value,
      ca: this.certificateForm?.get('isCA')?.value,
      ds: this.certificateForm?.get('isDS')?.value,
      ke: this.certificateForm?.get('isKE')?.value,
      kcs: this.certificateForm?.get('isKCS')?.value,
      crls: this.certificateForm?.get('isCRLS')?.value,
    };

    console.log("SERTIFIKAT ZAHTEV:", certificateRequest);
    this.hostRequestService.createCertificateRequest(certificateRequest).subscribe(() => {
      this.snackBar.open("Request is created successfully.", 'Close', {
        duration: 3000,
      });
    });
  }
}
