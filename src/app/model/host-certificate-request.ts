export interface HostCertificateRequest {
  id?: number
  email?: string;
  organisation?: string;
  organisationUnit?: string;
  country?: string;
  ca?: boolean;
  ds?: boolean;
  ke?:boolean;
  kcs?:boolean;
  crls?:boolean;
}
