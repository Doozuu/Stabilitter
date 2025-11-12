import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const VERCEL_ENV = process.env.VERCEL_ENV;

let prisma: PrismaClient;

if (VERCEL_ENV === "production") {
  // 프로덕션 환경에서는 'POSTGRES_URL' (풀링된 주소) 사용
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // 개발 환경
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
