"use client";

import { ComponentType, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface Patient {
  id: number;
  name: string;
}

interface TremorChartProps {
  patientId: number;
}

const DynamicTremorChart = dynamic<TremorChartProps>(
  () => import("../components/TremorChart"), // .ts or .tsx
  {
    ssr: false,
    loading: () => (
      <p style={{ height: "300px", textAlign: "center" }}>
        차트를 불러오는 중입니다...
      </p>
    ),
  }
) as ComponentType<TremorChartProps>;

const patients: Patient[] = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "김철수" },
  { id: 3, name: "이영희" },
];

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="max-w-md min-h-screen flex flex-col mx-auto pt-6 pb-15 pl-5 pr-5">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={120}
          height={200}
          className="cursor-pointer"
        />
      </Link>
      <h1 className="text-2xl font-bold mt-10 mx-auto">대시보드</h1>
      <Menu
        as="div"
        className="relative inline-block text-left w-27 mt-2 ml-auto mb-6"
      >
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
              {/* 7. 선택된 환자가 있으면 이름 표시, 없으면 "환자선택" 표시 */}
              {selectedPatient ? selectedPatient.name : "환자선택"}

              {/* 8. 스크린샷과 유사하게 위쪽 화살표 아이콘을 사용 (열려있으면 180도 회전) */}
              <ChevronUpIcon
                className={`ml-2 -mr-1 h-5 w-5 text-gray-400 ${
                  open ? "" : "transform rotate-180"
                }`}
                aria-hidden="true"
              />
            </Menu.Button>

            {/* 드롭다운 메뉴 리스트 */}
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {patients.map((patient) => (
                  <Menu.Item key={patient.id}>
                    {({ active }) => (
                      <button
                        // 9. 클릭 시 selectedPatient state를 업데이트
                        onClick={() => setSelectedPatient(patient)}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {patient.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
      {selectedPatient ? (
        // 11. 차트 컴포넌트에 선택된 환자 ID를 prop으로 전달
        <>
          <DynamicTremorChart patientId={selectedPatient.id} />
          <div className="flex flex-col gap-1.5 mt-5">
            <p className="text-xl font-bold">환자 정보</p>
            <div className="flex gap-10">
              <p className="font-bold">생년월일</p>
              <p>1999.12.31</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">환자번호</p>
              <p>1234567</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">특이사항</p>
              <p>척추 골절</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-5">
            <p className="text-xl font-bold">이송 정보</p>
            <div className="flex gap-10">
              <p className="font-bold">평균 흔들림</p>
              <p>0.25g</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">최대 충격</p>
              <p>2.1g</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">이동 시간</p>
              <p>12분 34초</p>
            </div>
          </div>
        </>
      ) : (
        // 환자 선택 전 안내 문구
        <div
          style={{ height: "300px" }}
          className="flex items-center justify-center text-gray-500"
        >
          환자를 선택해주세요.
        </div>
      )}
    </div>
  );
}
