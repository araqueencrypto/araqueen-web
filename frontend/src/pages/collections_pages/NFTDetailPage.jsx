// NFTDetailPage.jsx — FINAL IMAGE & DATA FIX
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNFTDetail, getActivity } from "../../services/nftService";

import NFTImageViewer from "./nft_comp/NFTImageViewer.jsx";
import NFTActionPanel from "./nft_comp/NFTActionPanel";
import NFTActivityHistory from "./nft_comp/NFTActivityHistory";
import NFTPriceChart from "./nft_comp/NFTPriceChart";
import NFTTraitsPanel from "./nft_comp/NFTTraitsPanel";

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

/* ================= IMAGE RESOLVER (FIX) ================= */
function resolveImage(nft) {
  if (!nft) return "/placeholder-nft.png";

  const candidates = [
    nft.image_local,
    nft.image,
    nft.image_link,
    nft.image_url,
    nft?.metadata?.image,
  ];

  for (let raw of candidates) {
    if (!raw) continue;

    // absolute url
    if (raw.startsWith("http")) return raw;

    // local backend file
    const clean = raw.replace(/^\/+/, "");
    return `${backendBaseUrl}/${clean}`;
  }

  return "/placeholder-nft.png";
}

/* ================= COMPONENT ================= */
export default function NFTDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const data = await getNFTDetail(id);
        if (!alive) return;

        setNft(data || null);

        if (data?.mint_address) {
          const act = await getActivity(data.mint_address);
          if (alive) setActivity(act || []);
        }
      } catch (e) {
        console.error("NFT detail load error:", e);
        if (alive) setNft(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, [id]);

  const imageUrl = useMemo(() => resolveImage(nft), [nft]);

  /* ================= STATES ================= */
  if (loading)
    return <div className="p-6 text-center text-gray-400">Loading NFT…</div>;

  if (!nft)
    return <div className="p-6 text-center text-gray-400">NFT not found.</div>;

  /* ================= RENDER ================= */
  return (
    <div className="p-3 sm:p-6 max-w-6xl mx-auto space-y-8 fade-in">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-pink-500 hover:underline"
      >
        ← Back
      </button>

      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* IMAGE */}
        <div className="glass border rounded-2xl p-4">
          <NFTImageViewer image={imageUrl} name={nft.name} />
        </div>

        {/* INFO */}
        <div className="glass border rounded-2xl p-5 space-y-4">
          <h1 className="text-2xl font-bold grad-aura-text">
            {nft.name || "Untitled NFT"}
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed">
            {nft.description || "No description provided."}
          </p>

          <NFTTraitsPanel nft={nft} />

        </div>
      </div>

      {/* ACTION */}
      <div className="glass border rounded-2xl p-4">
        <NFTActionPanel nft={nft} />
      </div>

      {/* CHART + ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NFTPriceChart nft={nft} />
        <NFTActivityHistory activity={activity} />
      </div>
    </div>
  );
}
