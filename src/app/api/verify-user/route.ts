import { verifyMessage, Address } from "viem";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import jwt from "jsonwebtoken";
import * as jwk from "~/app/api/jwk/jwk.json";

export const dynamic = 'force-dynamic';

const privateKey = process.env.PRIVATEKEY || fs.readFileSync("example.privateKey.pem");

const requestSchema = z.object({
	userAddress: z.string(),
	messageHash: z.string(),
	signatureData: z.string(),
	timestamp: z.date(),
});

function generateJWT(payload: { userAddress: string }) {
	const token = jwt.sign({
		sub: payload.userAddress,
		name: "Peersafe",
		iat: Math.floor(Date.now() / 1000),
		iss: "https://peersafe.tech",
		exp: Math.floor(Date.now() / 1000) + 7776000,
	},
		privateKey,
		{ algorithm: "RS256", keyid: jwk.kid },
	);

	return token;
}

export async function POST(request: NextRequest) {
	const validatedRequest = requestSchema.safeParse(await request.json());

	if (validatedRequest.success) {
		if (validatedRequest.data.timestamp.getSeconds() - new Date().getSeconds() <= 60) {
			const valid = await verifyMessage({
				address: validatedRequest.data.userAddress as Address,
				message: `I'm verifying I am ${validatedRequest.data.userAddress} at ${validatedRequest.data.timestamp}`,
				signature: validatedRequest.data.signatureData as Address,
			});

			if (valid) {
				return NextResponse.json({ jwtToken: generateJWT({ userAddress: validatedRequest.data.userAddress }) });
			}
			return NextResponse.json({ error: "Couldn't validate the message" }, { status: 400 });
		}
		return NextResponse.json({ error: "Timout" }, { status: 408 });
	}
	return NextResponse.json({ error: validatedRequest.error }, { status: 400 });
}
