"use client";

import { ComponentType, useState, useEffect } from "react"; // 1. useEffect import
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface Patient {
  id: number;
  name: string;
  patientNumber: string;
  birthdate: string;
  specialNotes: string | null;
}

interface TremorChartProps {
  patientId: number;
}

const DynamicTremorChart = dynamic<TremorChartProps>(
  () => import("../components/TremorChart"),
  {
    ssr: false,
    loading: () => (
      <p style={{ height: "300px", textAlign: "center" }}>
        차트를 불러오는 중입니다...
      </p>
    ),
  }
) as ComponentType<TremorChartProps>;

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/patients");
        if (!response.ok) {
          throw new Error("환자 목록을 불러오는데 실패했습니다.");
        }
        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="max-w-md min-h-screen flex flex-col mx-auto pt-6 pb-15 pl-5 pr-5">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={120}
          height={20}
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
            <Menu.Button
              disabled={isLoading}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "불러오는 중..."
                : selectedPatient
                ? selectedPatient.name
                : "환자선택"}

              <ChevronUpIcon
                className={`ml-2 -mr-1 h-5 w-5 text-gray-400 ${
                  open ? "" : "transform rotate-180"
                }`}
                aria-hidden="true"
              />
            </Menu.Button>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {error && (
                  <Menu.Item disabled>
                    <span className="block px-4 py-2 text-sm text-red-500">
                      {error}
                    </span>
                  </Menu.Item>
                )}
                {!isLoading && !error && patients.length === 0 && (
                  <Menu.Item disabled>
                    <span className="block px-4 py-2 text-sm text-gray-500">
                      등록된 환자가 없습니다.
                    </span>
                  </Menu.Item>
                )}

                {patients.map((patient) => (
                  <Menu.Item key={patient.id}>
                    {({ active }) => (
                      <button
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
        <>
          <DynamicTremorChart patientId={selectedPatient.id} />
          <div className="flex flex-col gap-1.5 mt-5">
            <p className="text-xl font-bold">환자 정보</p>
            <div className="flex gap-10">
              <p className="font-bold">생년월일</p>
              <p>
                {new Date(selectedPatient.birthdate).toLocaleDateString(
                  "ko-KR"
                )}
              </p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">환자번호</p>
              <p>{selectedPatient.patientNumber}</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">특이사항</p>
              <p>{selectedPatient.specialNotes || "없음"}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-5">
            <p className="text-xl font-bold">이송 정보</p>
            {/* TODO: 이송 정보(평균/최대값/시간)는 
              '/api/patients/[id]/data' API를 호출하여
              센서 데이터를 받아온 후 계산.
            */}
            <div className="flex gap-10">
              <p className="font-bold">평균 흔들림</p>
              <p>0.25g (계산 필요)</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">최대 충격</p>
              <p>2.1g (계산 필요)</p>
            </div>
            <div className="flex gap-10">
              <p className="font-bold">이동 시간</p>
              <p>12분 34초 (계산 필요)</p>
            </div>
          </div>
        </>
      ) : (
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
