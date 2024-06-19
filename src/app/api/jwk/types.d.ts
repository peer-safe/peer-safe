export interface JWK {
  kty: string;
  n: string;
  e: string;
  ext: boolean;
  kid: string;
  alg: string;
  use: string;
}
