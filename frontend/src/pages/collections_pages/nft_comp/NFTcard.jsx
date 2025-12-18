import React from "react";
import { Heart } from "lucide-react";

const backendBaseUrl = "http://localhost:8080";

function getImageUrl(raw) {
  if (!raw) return "/placeholder-nft.png";
  const clean = raw.replace(/^\/+/, "");
  if (clean.startsWith("http")) return clean;
  return `${backendBaseUrl}/${clean}`;
}

export default function NFTcard({
  nft,
  onClick = () => {},
  favorites = [],
  toggleFavorite = () => {}
}) {
  const id = nft.mint_address || nft.id;
  const isFav = favorites.includes(id);

  const priceColor = (p) =>
    !p || p <= 0
      ? "text-gray-400"
      : p <= 1
      ? "text-green-400"
      : p <= 5
      ? "text-blue-400"
      : "text-purple-400";

  // percent change (use value from backend OR random dummy)
  const change = nft.change ?? (Math.random() * 10 - 5);
  const changeColor =
    change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-gray-400";

  return (
    <div
      className="
        grad-aura-border rounded-2xl p-[2px]
        cursor-pointer transition 
        hover:scale-[1.03] tilt-3d
      "
      onClick={onClick}
    >
      <div
        className="
          bg-[var(--card-bg)] rounded-2xl shadow-1 
          relative overflow-hidden
        "
      >

        {/* FULL FRAME IMAGE */}
        <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
          <img
            src={getImageUrl(nft.image_local || nft.image)}
            className="w-full h-full object-cover"
            alt={nft.name}
          />
        </div>

        {/* NAME */}
        <div className="px-3 mt-3 font-semibold text-sm text-[var(--fg)] truncate">
          {nft.name}
        </div>

        {/* PRICE + BUY */}
        <div className="px-3 mb-3 mt-1 flex justify-between items-center">

          {/* LEFT SECTION: PRICE + PERCENT */}
          <div className="flex flex-col leading-tight">
            <span className={`font-bold text-sm ${priceColor(nft.list_price)}`}>
              {nft.list_price} SOL
            </span>
            <span className={`text-xs font-semibold ${changeColor}`}>
              {change > 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>

          {/* BUY BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="
              px-3 py-1 rounded-lg 
              grad-aura text-white text-sm 
              hover:opacity-90 transition
            "
          >
            BUY
          </button>

        </div>
      </div>
    </div>
  );
}
