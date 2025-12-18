// CollectionPage.jsx — POLISHED FINAL VERSION

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CollectionBanner from "./collec_page_comp/CollectionBanner";
import CollectionStats from "./collec_page_comp/CollectionStats";
import CollectionNFTGrid from "./collec_page_comp/CollectionNFTGrid";

const backendBaseUrl = "http://localhost:8080";

export default function CollectionPage() {
  const { collectionName: name } = useParams();
  const navigate = useNavigate();

  const [filtered, setFiltered] = useState(null);
  const [stats, setStats] = useState(null);

  if (!name) return null;

  useEffect(() => {
    const loadNFTs = async () => {
      const r = await fetch(`${backendBaseUrl}/api/nfts`);
      const data = await r.json();
      const my = data.data.filter((i) => i.collection === name);

      setFiltered(my);

      if (my.length) {
        const prices = my.map((i) => +i.list_price || 0).filter((v) => v > 0);
        const floor = prices.length ? Math.min(...prices) : 0;
        const volume = prices.reduce((a, b) => a + b, 0);

        setStats({
          floor,
          items: my.length,
          volume,
          listed: my.filter((x) => x.list_price > 0).length,
        });
      } else {
        setStats({ floor: 0, items: 0, volume: 0, listed: 0 });
      }
    };

    loadNFTs();
  }, [name]);

  if (!filtered || !stats) {
    return (
      <div className="text-center text-gray-400 py-10 fade-in">
        ......
      </div>
    );
  }

  return (
    <div className="fade-in max-w-5xl mx-auto px-3 space-y-3">

      <CollectionBanner
        name={name}
        stats={stats}
        backendBaseUrl={backendBaseUrl}
      />

      <div className="px-1">
        <button
          onClick={() => navigate("/marketplace/collections")}
          className="grad-aura px-6 py-3 rounded-xl text-white font-semibold 
            shadow-[0_0_12px_rgba(255,255,255,0.18)] hover:brightness-110 transition"
        >
          Back to Collections
        </button>
      </div>

      <CollectionStats stats={stats} />

      <div className="mt-6">
        <CollectionNFTGrid nfts={filtered} />
      </div>
    </div>
  );
}
