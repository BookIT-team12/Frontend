import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../../services/certificate.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Certificate} from "../../model/certificate";

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css']
})

export class AllCertificatesComponent implements OnInit{
  certificates!: Certificate[];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private certificateService: CertificateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.certificateService.getCertificates().subscribe((res: any) => {
      this.certificates = res;
      console.log("SVI SERTIFIKATI:" , this.certificates);
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
