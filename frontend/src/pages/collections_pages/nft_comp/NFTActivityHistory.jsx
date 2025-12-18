// src/pages/collections/nft/NFTActivityHistory.jsx
import React from "react";

export default function NFTActivityHistory({ activity = [] }) {
  if (!activity.length) {
    return (
      <div className="bg-white rounded-xl p-4 border text-sm text-gray-500">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 border">
      <div className="font-semibold mb-2">Activity</div>
      <div className="space-y-2 text-sm">
        {activity.map((a, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-sm">{a.type}</div>
              <div className="text-xs text-gray-500">{new Date(a.time).toLocaleString()}</div>
              <div className="text-xs text-gray-500">by {a.user}</div>
            </div>
            <div className="font-semibold text-pink-600">{a.price} SOL</div>
          </div>
        ))}
      </div>
    </div>
  );
}
