import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNFTDetail, getActivity } from "../../services/nftService";

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getImageUrl = (raw) => {
  if (!raw) return "/placeholder-nft.png";
  if (raw.startsWith("http")) return raw;
  return `${backendBaseUrl}/${raw.replace(/^\/+/, "")}`;
};

export default function NFTDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getNFTDetail(id);
      setNft(data || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!nft) return <div className="p-6 text-center">NFT not found</div>;

  return (
    <div className="p-3 sm:p-6 max-w-6xl mx-auto space-y-8">

      <button onClick={() => navigate(-1)} className="text-sm text-pink-500">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={getImageUrl(nft.image)}
          className="w-full aspect-square object-cover rounded-2xl"
        />

        <div className="glass border rounded-2xl p-4 sm:p-6">
          <h1 className="text-2xl font-bold grad-aura-text">{nft.name}</h1>
          <p className="text-gray-400 mt-3">{nft.description}</p>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="glass border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="text-2xl font-bold text-pink-500">
          {nft.list_price || 0} SOL
        </div>

        <button className="grad-aura px-6 py-2 rounded-xl text-white font-semibold">
          BUY
        </button>

        <div className="flex gap-2 sm:ml-auto">
          <input
            placeholder="0.00"
            className="w-full sm:w-24 p-2 rounded-xl border bg-[var(--glass-bg)]"
          />
          <button className="px-4 py-2 border rounded-xl">BID</button>
        </div>
      </div>
    </div>
  );
}
