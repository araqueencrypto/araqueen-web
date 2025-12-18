import { useEffect, useState } from "react";

export default function LeftPanel() {
  const [quickBids, setQuickBids] = useState([]);

  useEffect(() => {
    setQuickBids([
      { id: "A001", nftName: "Royal Cat #01", bid: 0.35, ends: 45 },
      { id: "A002", nftName: "Golden Queen #22", bid: 0.55, ends: 70 },
      { id: "A003", nftName: "Night Lotus #08", bid: 0.25, ends: 15 }
    ]);
  }, []);

  return (
    <div className="space-y-6">

      {/* HOT COLLECTION */}
      <div className="glass shadow-1 border rounded-2xl p-4 slide-right">
        <h3 className="text-[11px] font-bold grad-aura-text tracking-wide mb-3">
          🔥 HOT COLLECTIONS
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-20 rounded-xl nft-glow-ring nft-holo"
            />
          ))}
        </div>
      </div>

      {/* QUICK BID */}
      <div className="glass shadow-1 border rounded-2xl p-4 slide-right">
        <h3 className="text-[11px] font-bold grad-aura-text tracking-wide mb-3">
          ⚡ QUICK BIDS
        </h3>

        <div className="space-y-3">
          {quickBids.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-300/30 pb-2"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">
                  {item.nftName}
                </p>
                <p className="text-gray-500 text-xs">{item.id}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-pink-600 text-sm">{item.bid} SOL</p>
                <p className="text-gray-500 text-xs">{item.ends}m</p>
              </div>
            </div>
          ))}

          {quickBids.length === 0 && (
            <p className="text-center text-gray-400 text-xs">
              No active bids
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
