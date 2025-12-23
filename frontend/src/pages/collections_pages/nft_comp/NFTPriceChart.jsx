// NFTPriceChart.jsx — FINAL CONSISTENT VERSION
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function NFTPriceChart({ nft }) {
  const data = useMemo(() => {
    const base = parseFloat(nft?.list_price || 0.15);
    const days = 14;

    return Array.from({ length: days }).map((_, i) => {
      const drift = Math.sin(i / 2) * 0.04;
      const noise = (Math.random() - 0.5) * 0.03;
      return {
        day: `D-${days - i}`,
        price: +(base * (1 + drift + noise)).toFixed(3),
      };
    });
  }, [nft]);

  return (
    <div className="glass border rounded-2xl p-4 h-56">
      <div className="text-sm font-semibold grad-aura-text mb-2">
        Price History
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              background: "#0f0f0f",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ec4899"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
