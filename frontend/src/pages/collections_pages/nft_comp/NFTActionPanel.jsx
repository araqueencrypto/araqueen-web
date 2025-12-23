// NFTActionPanel.jsx — FINAL POLISHED VERSION
import React, { useState } from "react";

export default function NFTActionPanel({ nft }) {
  const [processing, setProcessing] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const price = nft?.list_price || 0;

  const handleBuy = async () => {
    if (!price) return;

    const confirm = window.confirm(
      `Buy "${nft.name}" for ${price} SOL?`
    );
    if (!confirm) return;

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Buy flow simulated. Connect this to wallet & backend.");
    }, 1200);
  };

  const handleBid = async () => {
    if (!bidAmount || Number(bidAmount) <= 0) {
      alert("Enter a valid bid amount.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`Bid ${bidAmount} SOL NFT submitted (simulated).`);
      setBidAmount("");
    }, 900);
  };

  return (
    <div className="space-y-4">

      {/* PRICE */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Current Price</span>
        <span className="text-2xl font-bold text-pink-400">
          {price} SOL
        </span>
      </div>

      {/* BUY */}
      <button
        onClick={handleBuy}
        disabled={processing}
        className="
          w-full py-3 rounded-xl
          font-semibold text-white
          grad-aura
          hover:opacity-90 transition
          disabled:opacity-50
        "
      >
        {processing ? "Processing..." : "Buy Now"}
      </button>

      {/* DIVIDER */}
      <div className="h-px bg-white/10 my-1" />

      {/* BID */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          step="0.001"
          min="0"
          placeholder="Enter bid (SOL)"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          disabled={processing}
          className="
            flex-1 px-4 py-2 rounded-xl
            bg-black/30 border border-white/10
            text-white placeholder-gray-500
            focus:outline-none focus:border-pink-400
          "
        />

        <button
          onClick={handleBid}
          disabled={processing}
          className="
            px-6 py-2 rounded-xl
            border border-white/20
            text-white
            hover:bg-white/10 transition
            disabled:opacity-50
          "
        >
          Place Bid
        </button>
      </div>

    </div>
  );
}
