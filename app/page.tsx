"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="max-w-md min-h-screen flex flex-col mx-auto pt-6 pb-15 pl-5 pr-5">
      <Image src="/logo.svg" alt="logo" width={120} height={200} />
      <h1 className="text-4xl font-bold mt-10 ml-2">
        실시간 <br /> 모니터링으로 <br /> 환자 이송을 <br />
        <span className="text-[#65BDF9]">안전</span>하게
      </h1>
      <Image
        src="/bed.png"
        alt="logo"
        width={330}
        height={200}
        className="mt-4 ml-auto"
      />
      <button
        className="text-lg text-[#65BDF9] w-full p-3 border border-[#65BDF9] rounded-2xl font-bold mb-5 mt-auto cursor-pointer"
        onClick={() => router.push("/register")}
      >
        환자 등록
      </button>
      <button
        className="text-lg bg-[#65BDF9] w-full p-3 text-white rounded-2xl font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        대시보드
      </button>
    </div>
  );
}
