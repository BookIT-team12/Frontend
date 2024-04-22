import {Component, OnInit} from '@angular/core';
import {Certificate} from "../../model/certificate";
import {CertificateService} from "../../services/certificate.service";

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.css']
})

export class MyCertificatesComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 5;
  certificates!: Certificate[];

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    //dobavljaju se sertifikati vlasnika koji udje da vidi svoje sertifikaate
    this.certificateService.getMyCertificates().subscribe((res: any) => {
      this.certificates = res;
      console.log("MOJI SERTIFIKATI:" , this.certificates);
    });
  }

  revokeCertificate(alias: string) {
    this.certificateService.revokeCertificate(alias).subscribe();
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
