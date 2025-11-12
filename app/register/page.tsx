"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  birthdate: string;
  patientId: string;
  specialNotes: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthdate: "",
    patientId: "",
    specialNotes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.birthdate.trim() !== "" &&
    formData.patientId.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "환자 등록에 실패했습니다.");
      }

      alert("환자가 성공적으로 등록되었습니다.");
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      <h1 className="text-3xl font-bold mt-10 mx-auto">환자 등록</h1>

      <div className="flex flex-col gap-2 mt-10">
        <p>이름</p>
        <div className="relative w-full">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ex. 홍길동"
            className="p-3 rounded-2xl border border-gray-500 w-full pr-10"
          />
          {formData.name && (
            <button
              type="button"
              onClick={() => handleClear("name")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <p>생년월일</p>
        <div className="relative w-full">
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="p-3 rounded-2xl border border-gray-500 w-full pr-10"
          />
          {formData.birthdate && (
            <button
              type="button"
              onClick={() => handleClear("birthdate")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* 환자번호 */}
        <p>환자번호</p>
        <div className="relative w-full">
          <input
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            placeholder="ex. 1234567"
            className="p-3 rounded-2xl border border-gray-500 w-full pr-10"
          />
          {formData.patientId && (
            <button
              type="button"
              onClick={() => handleClear("patientId")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <p>특이사항</p>
        <div className="relative w-full">
          <input
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleChange}
            placeholder="ex. 척추 골절"
            className="p-3 rounded-2xl border border-gray-500 w-full pr-10"
          />
          {formData.specialNotes && (
            <button
              type="button"
              onClick={() => handleClear("specialNotes")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || !isFormValid}
        className="text-lg bg-[#65BDF9] w-full p-3 text-white rounded-2xl font-bold mt-auto disabled:bg-gray-400"
      >
        {isLoading ? "등록 중..." : "등록하기"}
      </button>
    </div>
  );
}
