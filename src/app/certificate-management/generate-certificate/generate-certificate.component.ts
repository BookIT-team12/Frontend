import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../../services/certificate.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Certificate} from "../../model/certificate";
import {HostCertificateRequest} from "../../model/host-certificate-request";
import {SubjectObj} from "../../model/subject";
import {HostRequestService} from "../../services/host-request.service";

@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.css']
})

export class GenerateCertificateComponent implements OnInit{
  certificates!: Certificate[];
  subjectCN!:string;
  subjectO!: string | undefined;
  subjectOU!: string | undefined;
  subjectCountry!:string | undefined;
  startDate: any;
  endDate: any;
  selectedKeySize!: string;
  selectedEndDate: any;
  selectedStartDate: any;
  selectedST!: string;
  selectedOU!: string;
  selectedO!: string;
  selectedCN!: string | undefined;
  selectedTemp: any;
  selectedAlias!: string;
  selectedC!: string;
  selectedUN!: string;
  hostRequests!: HostCertificateRequest[];
  notUsedHostRequests!:HostCertificateRequest[];
  isCRL!: boolean | undefined;
  isCA!: boolean | undefined;
  isDS!: boolean | undefined;
  isKE!: boolean | undefined;
  isKCS!: boolean | undefined;
  CAcertificates! : Certificate[];
  selectedHostRequest: HostCertificateRequest | undefined;
  selectedRequestId: number | undefined;

  constructor(
    private certificateService: CertificateService,
    private snackBar : MatSnackBar,
    private hostRequestService: HostRequestService
  ) {}

  ngOnInit(): void {

    //dobavljamo sve sertifikate kako bismo mogli da odaberemo ca sertifikat za issuera
    this.certificateService.getCertificates().subscribe((res: any) => {
      this.certificates = res;

      //od svih sertifikata biramo onaj koji je ca
      this.CAcertificates = this.certificates.filter((cert: Certificate) => cert.ca);
      console.log("SERTIFIKATI U CA", this.CAcertificates)
      console.log("SERTIFIKATI U GEN ", this.certificates)

      //dobavimo sve zahteve za kreiranje sertifikata od vlasnika
      this.hostRequestService.getAllRequests().subscribe((res: any) => {
        this.hostRequests = res;
        console.log("ZAHTEVI", this.hostRequests);

        //od svih zahteva uzimamo samo neiskoriscene zahteve
        const certificateRequestIds = this.certificates.map(cert => cert.requestId);
        this.notUsedHostRequests = this.hostRequests.filter(hostRequest => !certificateRequestIds.includes(hostRequest.id));
        console.log("NEISKORISCENI ZAHTEVI", this.notUsedHostRequests);
      });

    });


  }

  findCertificateByAlias(alias: string): Certificate | undefined {
    return this.certificates.find((cert) => cert.alias === alias);
  }



  createCertificate() {

    const certificateDTO: Certificate = {
      requestId: this.selectedHostRequest?.id as number,
      issuer :this.selectedAlias,
      // C=SRB, OU=Certificate issuer department, O=My Root organisation enterprise, CN=Root CA
      // subject:"C=" + this.subjectCountry + ", " + "OU=" + this.subjectOU + ", " + "O=" + this.subjectO + ", " + "CN=" + this.subjectCN,
      commonName:this.subjectCN,
      startDate:this.startDate,
      endDate:this.endDate,
      ca: this.isCA,
      ds: this.isDS,
      ke: this.isKE,
      kcs: this.isKCS,
      crls: this.isCRL
    };

    let selectedStartDateMs = this.parseDate(this.selectedStartDate).getTime();
    let startDateMs = Date.parse(this.startDate);
    let endDateMs = Date.parse(this.endDate);
    let selectedEndDateMs = this.parseDate(this.selectedEndDate).getTime();

    if (
      startDateMs > selectedStartDateMs &&
      endDateMs < selectedEndDateMs &&
      startDateMs > Date.now() - 86400000 &&
      startDateMs < selectedEndDateMs &&
      endDateMs > startDateMs
    ) {
      console.log("CERTIFICATE THAT IS CREATED:" , certificateDTO)
      this.certificateService.createCertificate(certificateDTO).subscribe();
    } else {
      window.alert('Wrong date!');
    }
  }

  onSelectionChanged() {
    this.selectedAlias = this.selectedKeySize;
    const selectedCert = this.findCertificateByAlias(this.selectedAlias);

    if (selectedCert) {
      const certSubject = selectedCert.commonName;
      const subjectObj: any = {
        C: '',
        OU: '',
        O: '',
        CN: '',
      };

      certSubject?.split(',').forEach((item: string) => {
        const parts = item.trim().split('=');
        const key = parts[0].trim();
        const value = parts[1].trim();
        subjectObj[key] = value;
      });

      this.selectedCN = subjectObj.CN;
      this.selectedO = subjectObj.O;
      this.selectedOU = subjectObj.OU;
      this.selectedC = subjectObj.C;
      this.selectedEndDate = this.findCertificateByAlias(
        this.selectedKeySize
      )?.endDate;
      this.selectedStartDate = this.findCertificateByAlias(
        this.selectedKeySize
      )?.startDate;
      this.selectedTemp = this.findCertificateByAlias(
        this.selectedKeySize
      )?.ca;
    }
  }

  parseDate(dateStr: string): Date {
    const months: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const [dayOfWeek, monthStr, dayOfMonth, time, timeZone, year] =
      dateStr.split(' ');
    const [hours, minutes, seconds] = time.split(':');

    const date = new Date();
    date.setUTCFullYear(Number(year));
    date.setUTCMonth(months[monthStr]);
    date.setUTCDate(Number(dayOfMonth));
    date.setUTCHours(Number(hours));
    date.setUTCMinutes(Number(minutes));
    date.setUTCSeconds(Number(seconds));

    return date;
  }

  onSelectionChangedRequest() {
    this.selectedHostRequest = this.hostRequests.find(request => request.id === this.selectedRequestId);
    if (this.selectedHostRequest) {
      this.isCA = this.selectedHostRequest.ca;
      this.isDS = this.selectedHostRequest.ds;
      this.isKE = this.selectedHostRequest.ke;
      this.isKCS = this.selectedHostRequest.kcs;
      this.isCRL = this.selectedHostRequest.crls;
      this.subjectO = this.selectedHostRequest.organisation;
      this.subjectOU = this.selectedHostRequest.organisationUnit;
      this.subjectCountry = this.selectedHostRequest.organisation;
    }
  }

}
