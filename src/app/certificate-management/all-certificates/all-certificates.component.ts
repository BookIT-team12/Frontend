import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../../services/certificate.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css']
})

export class AllCertificatesComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private certificateService: CertificateService,
    private snackBar: MatSnackBar
  ) {}


  private certificates = [
    {
      type: 'Root CA1',
      issuer: 'Example Root CA',
      subject: 'Example Root CA',
      startDate: '2022-01-01',
      endDate: '2030-01-01',
      alias: 'my root ca',
      isRevoked: false
    },
    {
      type: 'Intermediate CA2',
      issuer: 'Example Root CA',
      subject: 'Example Intermediate CA',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      alias: 'intermediate ca',
      isRevoked: false
    },
    {
      type: 'End-entity3',
      issuer: 'Example Intermediate CA',
      subject: 'Example End-entity Certificate',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      alias: 'end-entity cert',
      isRevoked: true
    },
    {
      type: 'Root CA4',
      issuer: 'Example Root CA',
      subject: 'Example Root CA',
      startDate: '2022-01-01',
      endDate: '2030-01-01',
      alias: 'my root ca',
      isRevoked: false
    },
    {
      type: 'Intermediate CA5',
      issuer: 'Example Root CA',
      subject: 'Example Intermediate CA',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      alias: 'intermediate ca',
      isRevoked: false
    },
    {
      type: 'End-entity6',
      issuer: 'Example Intermediate CA',
      subject: 'Example End-entity Certificate',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      alias: 'end-entity cert',
      isRevoked: true
    },{
      type: 'Root CA7',
      issuer: 'Example Root CA',
      subject: 'Example Root CA',
      startDate: '2022-01-01',
      endDate: '2030-01-01',
      alias: 'my root ca',
      isRevoked: false
    },
    {
      type: 'Intermediate CA8',
      issuer: 'Example Root CA',
      subject: 'Example Intermediate CA',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      alias: 'intermediate ca',
      isRevoked: false
    },
    {
      type: 'End-entity9',
      issuer: 'Example Intermediate CA',
      subject: 'Example End-entity Certificate',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      alias: 'end-entity cert',
      isRevoked: true
    },{
      type: 'Root CA10',
      issuer: 'Example Root CA',
      subject: 'Example Root CA',
      startDate: '2022-01-01',
      endDate: '2030-01-01',
      alias: 'my root ca',
      isRevoked: false
    },
    {
      type: 'Intermediate CA11',
      issuer: 'Example Root CA',
      subject: 'Example Intermediate CA',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      alias: 'intermediate ca',
      isRevoked: false
    },
    {
      type: 'End-entity12',
      issuer: 'Example Intermediate CA',
      subject: 'Example End-entity Certificate',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      alias: 'end-entity cert',
      isRevoked: true
    },{
      type: 'Root CA13',
      issuer: 'Example Root CA',
      subject: 'Example Root CA',
      startDate: '2022-01-01',
      endDate: '2030-01-01',
      alias: 'my root ca',
      isRevoked: false
    },
    {
      type: 'Intermediate CA14',
      issuer: 'Example Root CA',
      subject: 'Example Intermediate CA',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      alias: 'intermediate ca',
      isRevoked: false
    },
    {
      type: 'End-entity15',
      issuer: 'Example Intermediate CA',
      subject: 'Example End-entity Certificate',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      alias: 'end-entity cert',
      isRevoked: true
    }
  ];

  ngOnInit(): void {
    this.certificateService.getCertificates().subscribe((res: any) => {
      this.certificates = res;
    });
  }

  revokeCertificate(alias: string) {
    this.certificateService.revokeCertificate(alias).subscribe();
    location.reload();
  }

  validateCertificate(alias: string) {
    this.certificateService.validateCertificate(alias).subscribe((res) => {
      if (res) {
        this.snackBar.open("Certificate is valid!", 'Close', {
          duration: 3000,
        });
      } else {
        this.snackBar.open("Certificate is invalid!", 'Close', {
          duration: 3000,
        });
      }
    });
  }

  saveCertificate(alias: string) {
    this.certificateService.saveCertificate(alias).subscribe((res) => {
      if (!res) {
        this.snackBar.open("Certificate saved successfully!", 'Close', {
          duration: 3000,
        });
      } else {
        this.snackBar.open("Error, certificate can not be saved!", 'Close', {
          duration: 3000,
        });
      }
    });
  }

  get paginatedCertificates(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.certificates.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getPages(): number[] {
    const totalItems = this.certificates.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

}
