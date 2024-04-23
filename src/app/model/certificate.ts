export interface Certificate {
  requestId?: number;
  issuer: string; //issuerAlias
  commonName?: string; // subject ceo
  startDate?: string;
  endDate?: string;
  alias?: string;
  isRevoked?: boolean;
  ca?: boolean;
  ds?: boolean;
  ke?: boolean;
  kcs?: boolean;
  crls?: boolean;
}
