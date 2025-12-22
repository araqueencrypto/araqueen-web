/* NFT DETAIL — ARAQUEEN THEME FINAL PACK V3 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NFTPriceChart from "./nft_comp/NFTPriceChart";
import NFTActivityHistory from "./nft_comp/NFTActivityHistory";
import { getNFTDetail, getActivity } from "../../services/nftService";

//const backendBaseUrl = "http://localhost:8080";
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;


// Image resolver
const getImageUrl = (raw) => {
  if (!raw) return "/placeholder-nft.png";
  const clean = raw.replace(/^\/+/, "");
  if (clean.startsWith("http")) return clean;
  return `${backendBaseUrl}/${clean}`;
};

// Short address
const short = (addr) => {
  if (!addr) return "-";
  return addr.slice(0, 4) + "..." + addr.slice(-4);
};

export default function NFTDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tooltip, setTooltip] = useState(""); // copy tooltip

  const copyText = (value) => {
    navigator.clipboard.writeText(value);
    setTooltip("Copied!");
    setTimeout(() => setTooltip(""), 1200);
  };

  // Rarity badge Aura Style
  const rarityBadge = (rarity) => {
    if (!rarity) return null;

    const map = {
      epic: "bg-purple-100 text-purple-700 border-purple-300",
      rare: "bg-yellow-100 text-yellow-700 border-yellow-300",
      common: "bg-blue-100 text-blue-700 border-blue-300",
      legendary: "bg-red-100 text-red-700 border-red-300",
    };

    const cls = map[rarity.toLowerCase()] || "bg-gray-200 text-gray-800 border-gray-300";

    return (
      <span
        className={
          `px-2 py-1 text-xs border rounded-lg font-semibold shadow-1 ` + cls
        }
      >
        {rarity}
      </span>
    );
  };

  useEffect(() => {
  async function load() {
    try {
      setLoading(true);

      const res = await getNFTDetail(id);
      const nftData = res?.data || null;

      setNft(nftData);

      if (nftData) {
        const act = await getActivity(nftData.mint_address || id);
        setActivity(act?.data || act || []);
      }

    } catch (err) {
      console.error("NFT detail load error:", err);
      setNft(null);
    } finally {
      setLoading(false);
    }
  }

  load();
}, [id]);


  if (loading) return <div className="p-6 text-center text-gray-400">.......</div>;
  if (!nft) return <div className="p-6 text-center text-gray-400">NFT not found.</div>;

  const img = getImageUrl(nft.image_local || nft.image || nft.image_link);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 fade-in text-[var(--fg)]">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-pink-500 hover:underline soft-press"
      >
        ← Back
      </button>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start fade-in">

        {/* IMAGE CARD */}
        <div className="glass shadow-1 border rounded-2xl p-5 nft-holo hover:shadow-focus transition tilt-3d">
          <img
            src={img}
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>

        {/* INFO PANEL */}
        <div className="glass shadow-1 border rounded-2xl p-6">

          <div className="text-3xl font-bold mb-3 grad-aura-text">{nft.name}</div>

          {/* Rarity badge */}
          {rarityBadge(nft.rarity)}

          <div className="text-gray-400 text-sm mt-4 mb-6 leading-relaxed">
            {nft.description || "No description provided."}
          </div>

          {/* INFO TABLE */}
          <table className="w-full text-sm">
            <tbody className="text-[var(--fg)]">
              {[
                ["Mint", nft.mint_address],
                ["Owner", nft.owner_address],
                ["Edition", nft.edition],
                ["Royalty", nft.royalty],
                ["Status", nft.status],
              ].map(([label, value], i) => (
                <tr key={i} className="border-b border-gray-300/20 hover:bg-white/5 transition">

                  <td className="py-2 font-medium w-32 text-gray-400">
                    {label}
                  </td>

                  <td className="py-2 flex items-center gap-2">

                    {(label === "Mint" || label === "Owner") ? (
                      <div className="relative flex items-center gap-2">

                        <span
                          onClick={() => copyText(value)}
                          className="cursor-pointer hover:text-pink-500 font-semibold"
                        >
                          {short(value)}
                        </span>

                        {/* Copy Icon */}
                        <svg
                          onClick={() => copyText(value)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 cursor-pointer text-gray-400 hover:text-pink-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.4}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 17h8a2 2 0 002-2V7M16 3H6a2 2 0 00-2 2v10"
                          />
                        </svg>

                        {/* Tooltip */}
                        {tooltip && (
                          <span className="absolute -top-6 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-90">
                            {tooltip}
                          </span>
                        )}
                      </div>
                    ) : (
                      value || "-"
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>


      {/* ACTION BAR */}
      <div className="
        glass shadow-1 border rounded-2xl p-5 
        flex items-center gap-4 fade-in
      ">

        <div className="text-2xl font-bold text-pink-500">
          {nft.list_price || 0} SOL
        </div>

        {/* BUY */}
        <button className="
          px-5 py-2 grad-aura text-white rounded-xl
          hover:shadow-focus soft-press transition text-sm font-semibold
        ">
          BUY
        </button>

        {/* BID INPUT */}
        <div className="flex items-center gap-2 ml-auto">
          <input
            placeholder="0.00"
            className="
              glass border rounded-xl p-2 w-24 text-sm 
              text-[var(--fg)] placeholder-gray-400
            "
          />
          <button className="
            px-4 py-2 border rounded-xl 
            hover:bg-white/10 soft-press transition text-sm
          ">
            BID
          </button>
        </div>

      </div>


      {/* CHART + BID LIST SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 fade-in">

        {/* PRICE CHART PANEL */}
        <div className="glass shadow-1 border rounded-2xl p-5 slide-up">
          <div className="font-semibold mb-3 grad-aura-text">
            Price Chart
          </div>

          <NFTPriceChart nft={nft} />
        </div>

        {/* BID LIST PANEL */}
        <div className="glass shadow-1 border rounded-2xl p-5 slide-up">
          <div className="font-semibold mb-3 grad-aura-text">
            Bid List
          </div>

          <table className="w-full text-sm border-collapse text-[var(--fg)]">
            <thead>
              <tr className="bg-white/5 text-gray-300 border-b border-gray-300/20">
                <th className="py-2 px-2 text-left">User</th>
                <th className="py-2 px-2 text-left">Bid (SOL)</th>
                <th className="py-2 px-2 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-gray-300/20 hover:bg-white/5 transition">
                <td className="py-2 px-2">—</td>
                <td className="py-2 px-2">—</td>
                <td className="py-2 px-2">—</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
      {/* TRANSACTION HISTORY */}
      <div className="
        glass shadow-1 border rounded-2xl p-5 
        fade-in slide-up
      ">
        <div className="font-semibold mb-3 grad-aura-text">
          Transaction History
        </div>

        <NFTActivityHistory 
          activity={activity} 
          useTable={true} 
        />
      </div>

    </div>
  );
}
