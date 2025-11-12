import { PrismaClient } from "@prisma/client";

// PrismaClient 인스턴스를 저장할 전역 변수
// (개발 환경에서 hot reload 시 DB 연결이 너무 많아지는 것을 방지)
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // 프로덕션 환경: 새 인스턴스 생성
  // (Vercel 환경에서는 PrismaClient가 자동으로 env의 Accelerate URL을 감지)
  prisma = new PrismaClient();
} else {
  // 개발(local) 환경:
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
