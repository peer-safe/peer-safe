import jwk from "./jwk.json";

export async function GET() {
  return Response.json(jwk);
}
