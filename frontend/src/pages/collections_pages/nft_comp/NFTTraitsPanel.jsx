// src/pages/collections/nft/NFTTraitsPanel.jsx
import React from "react";

export default function NFTTraitsPanel({ attributes = [] }) {
  if (!attributes || !attributes.length) {
    return <div className="text-sm text-gray-500">No traits available.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {attributes.map((t, i) => {
        const name = t.trait_type || t.type || t.name || `trait${i}`;
        const value = t.value || t.v || t.val || "-";
        return (
          <div key={i} className="bg-gray-50 rounded p-2 text-xs">
            <div className="text-gray-500">{name}</div>
            <div className="font-semibold">{value}</div>
          </div>
        );
      })}
    </div>
  );
}
