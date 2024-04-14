import { config } from 'dotenv';
import { z } from 'zod';
config();
const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().transform(Number),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  PORT: z.optional(z.string().transform(Number)),
});
export const env = envSchema.parse(process.env);
