import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // 👈 [중요] @/lib/prisma를 import합니다.

// POST /api/patients : 새 환자 등록
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, birthdate, patientId, specialNotes } = data;

    // ... (유효성 검사 로직)

    const newPatient = await prisma.patient.create({
      // 'prisma'를 그대로 사용
      data: {
        name,
        birthdate: new Date(birthdate),
        patientNumber: patientId,
        specialNotes,
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "데이터 생성 중 오류 발생" },
      { status: 500 }
    );
  }
}

// GET /api/patients : 모든 환자 목록 조회
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      // 1. select를 수정하여 모든 필요 정보를 가져옵니다.
      select: {
        id: true,
        name: true,
        patientNumber: true,
        birthdate: true, // 추가
        specialNotes: true, // 추가
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "데이터 조회 중 오류 발생" },
      { status: 500 }
    );
  }
}
