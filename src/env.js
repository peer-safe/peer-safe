import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PRIVATE_KEY: z
      .string()
      .startsWith("-----BEGIN RSA PRIVATE KEY-----")
      .endsWith("-----END RSA PRIVATE KEY-----"),
  },

  client: {
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID: z.string(),
    NEXT_PUBLIC_PUBLIC_KEY: z
      .string()
      .startsWith("-----BEGIN PUBLIC KEY-----")
      .endsWith("-----END PUBLIC KEY-----"),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID:
      process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
