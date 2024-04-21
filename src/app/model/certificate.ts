export interface Certificate {
  issuerAlias?: string;
  subjectCommonName?: string;
  startDate?: string;
  endDate?: string;
  alias?: string;
  isRevoked?: boolean;
  isCA?: boolean;
  isDS?: boolean;
  isKE?: boolean;
  isKCS?: boolean;
  isCRLS?: boolean;
}
