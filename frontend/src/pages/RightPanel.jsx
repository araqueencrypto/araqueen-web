export default function RightPanel() {
  const leaderboard = [
    { user: "0xAb3...45", total: 5 },
    { user: "0xBf1...9a", total: 4 },
    { user: "0xCe8...F2", total: 3 }
  ];

  const activity = [
    "Buy NFT #23",
    "Sold NFT #76",
    "Bid Win NFT #11"
  ];

  return (
    <div className="space-y-6">

      {/* LEADERBOARD */}
      <div className="glass shadow-1 border rounded-2xl p-4 slide-left">
        <h3 className="text-[11px] font-bold grad-aura-text tracking-wide mb-3">
          🏆 LEADERBOARD
        </h3>

        <div className="space-y-3 text-xs">
          {leaderboard.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-gray-300/30 pb-2">
              <span className="font-medium text-[var(--fg)]">
                #{idx + 1} {item.user}
              </span>
              <span className="font-bold text-pink-600">
                {item.total} NFTs
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="glass shadow-1 border rounded-2xl p-4 slide-left">
        <h3 className="text-[11px] font-bold grad-aura-text tracking-wide mb-3">
          💳 RECENT ACTIVITY
        </h3>

        <div className="space-y-3 text-xs">
          {activity.map((txt, idx) => (
            <div key={idx} className="border-b border-gray-300/30 pb-2 text-[var(--fg)]">
              {txt}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
