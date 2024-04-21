import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user.model";
import {CertificateService} from "../../services/certificate.service";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HostCertificateRequest} from "../../model/host-certificate-request";
import {HostRequestService} from "../../services/host-request.service";

@Component({
  selector: 'app-host-certificate-request',
  templateUrl: './host-certificate-request.component.html',
  styleUrls: ['./host-certificate-request.component.css']
})

export class HostCertificateRequestComponent implements OnInit{
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
    this.certificateForm = this.formBuilder.group({
      email: ['', Validators.required],
      subjectCN: ['', Validators.required],
      subjectO: ['', Validators.required],
      subjectOU: ['', Validators.required],
      subjectCountry: ['', Validators.required],
      isCA: ['', Validators.required],
      isDT: ['', Validators.required],
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
    if (this.certificateForm?.invalid) {
      return;
    }

    var certificateRequest:HostCertificateRequest = {
      hostUsername: this.user?.email,
      commonName: this.certificateForm?.get('subjectCN')?.value,
      organisation: this.certificateForm?.get('subjectO')?.value,
      organisationUnit: this.certificateForm?.get('subjectOU')?.value,
      country: this.certificateForm?.get('subjectOU')?.value,
      isCA: this.certificateForm?.get('isCA')?.value,
      isDS: this.certificateForm?.get('isDS')?.value,
      isKE: this.certificateForm?.get('isKE')?.value,
      isKCS: this.certificateForm?.get('isKCS')?.value,
      isCRLS: this.certificateForm?.get('isCRLS')?.value,
    };

      this.hostRequestService.createCertificateRequest(certificateRequest).subscribe(() => {
        this.snackBar.open("Request is created successfully.", 'Close', {
          duration: 3000,
        });
      });
    }
}
