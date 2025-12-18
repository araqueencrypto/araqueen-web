// src/pages/collections/nft/NFTPriceChart.jsx
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
  // build dummy timeseries (7 days) based on current list_price
  const data = useMemo(() => {
    const base = parseFloat(nft.list_price || 0) || 0.1;
    const days = 14;
    const arr = [];
    for (let i = days - 1; i >= 0; i--) {
      // small fluctuation
      const fluct = (Math.sin(i / 2) + Math.random() * 0.5) * 0.01 * base;
      const price = Math.max(0.001, +(base + fluct).toFixed(4));
      arr.push({
        day: `${i}d`,
        price,
      });
    }
    return arr;
  }, [nft]);

  return (
    <div className="w-full h-48 bg-white rounded-xl border p-3">
      <div className="text-sm text-gray-600 mb-2">Price History (mock)</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" tick={{ fontSize: 10 }} />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} />
          <Tooltip />
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
