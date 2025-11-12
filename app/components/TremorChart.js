"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend, // 범례 (선택 사항)
} from "recharts";

// 라즈베리 파이에서 실시간으로 수집되는 데이터라고 가정한 Mock Data
// 실제로는 이 배열을 밖에서 props로 받거나,
// state로 관리하면서 (예: 1초마다) 업데이트해야 합니다.
const data = [
  { time: "14:05:01", 흔들림: 5.2, 충격: 1.1 },
  { time: "14:05:02", 흔들림: 5.8, 충격: 1.5 },
  { time: "14:05:03", 흔들림: 4.5, 충격: 0.8 },
  { time: "14:05:04", 흔들림: 7.0, 충격: 3.0 },
  { time: "14:05:05", 흔들림: 6.5, 충격: 2.1 },
  { time: "14:05:06", 흔들림: 8.1, 충격: 4.5 },
  { time: "14:05:07", 흔들림: 7.9, 충격: 3.0 },
  { time: "14:05:08", 흔들림: 9.0, 충격: 2.0 },
  { time: "14:05:09", 흔들림: 8.5, 충격: 1.5 },
  { time: "14:05:10", 흔들림: 7.5, 충격: 1.2 },
];

export default function RealtimeTremorChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        {/* X축: data의 'time' 키를 사용 */}
        <XAxis dataKey="time" />

        {/* Y축: 센서 값의 범위 (예: 0~50) */}
        {/* domain을 [0, 'auto']로 하면 0부터 최대값까지 자동으로 조절됩니다. */}
        <YAxis domain={[0, 50]} />

        {/* 툴팁 */}
        <Tooltip />

        {/* 범례 */}
        <Legend />

        {/* 배경 그리드 */}
        <CartesianGrid stroke="#f5f5f5" />

        {/* '흔들림' 라인 */}
        <Line
          type="monotone"
          dataKey="흔들림" // data 객체의 '흔들림' 키
          stroke="#4A90E2" // 파란색
          strokeWidth={2}
          dot={false}
        />

        {/* '충격' 라인 (이미지처럼 두 개를 그리려면 Line 컴포넌트 추가) */}
        <Line
          type="monotone"
          dataKey="충격" // data 객체의 '충격' 키
          stroke="#D0021B" // 붉은색
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
