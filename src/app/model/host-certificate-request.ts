export interface HostCertificateRequest {
  hostUsername?: string;
  organisation?: string;
  organisationUnit?: string;
  country?: string;
  isCA?: boolean;
  isDS?: boolean;
  isKE?:boolean;
  isKCS?:boolean;
  isCRLS?:boolean;
}
