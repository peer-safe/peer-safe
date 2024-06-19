import * as jwk from "./jwk.json";
// import * as jwk from ".jwk.json";

export async function GET(request: Request) {
	return Response.json(jwk);
}
