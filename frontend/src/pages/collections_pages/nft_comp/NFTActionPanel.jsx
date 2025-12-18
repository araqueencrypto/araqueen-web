// src/pages/collections/nft/NFTActionPanel.jsx
import React, { useState } from "react";

export default function NFTActionPanel({ nft }) {
  const [processing, setProcessing] = useState(false);

  const handleBuy = async () => {
    // placeholder - integrate with wallet & backend
    const confirm = window.confirm(`Buy ${nft.name} for ${nft.list_price} SOL?`);
    if (!confirm) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Buy flow simulated. Integrate with backend & wallet.");
    }, 1200);
  };

  const handleBid = async () => {
    const bid = prompt("Enter bid amount (SOL):", nft.list_price || "0.1");
    if (!bid) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`Bid ${bid} SOL submitted (simulated).`);
    }, 800);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          onClick={handleBuy}
          disabled={processing}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-lg font-semibold"
        >
          {processing ? "Processing..." : `Buy ${nft.list_price} SOL`}
        </button>

        <button
          onClick={handleBid}
          disabled={processing}
          className="px-4 py-2 border rounded-lg"
        >
          Bid
        </button>
      </div>

      <div className="text-xs text-gray-500">
        Bid and buy flows are simulated. Hook this to your wallet backend.
      </div>
    </div>
  );
}
