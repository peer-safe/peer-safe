import type { JWK } from "~/app/api/jwk/types";
import { env } from "~/env";

const jwk = (await import(
  `~/app/api/jwk/${env.NODE_ENV === "production" ? "jwk.json" : "example.jwk.json"}`
)) as JWK;

export async function GET() {
  return Response.json(jwk);
}
