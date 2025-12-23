import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NFTcard from "./collections_pages/nft_comp/NFTcard";

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function NFTGallery() {
  const [nfts, setNfts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleNFTs, setVisibleNFTs] = useState(24);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const parent = params.get("parent");

  useEffect(() => {
    fetch(`${backendBaseUrl}/api/nfts`)
      .then((r) => r.json())
      .then((d) => {
        setNfts(d.data || []);
        setFiltered(d.data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const res = nfts.filter((i) =>
      (i.name || "").toLowerCase().includes(search.toLowerCase()) &&
      (!parent || i.collection === parent)
    );
    setFiltered(res);
  }, [search, parent, nfts]);

  return (
    <div className="space-y-4">

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="w-full px-4 py-2 rounded-xl border bg-[var(--card-bg)]"
          placeholder="Search NFTs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center text-gray-400">Loading NFTs...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filtered.slice(0, visibleNFTs).map((nft) => (
              <NFTcard
                key={nft.id}
                nft={nft}
                onClick={() =>
                  navigate(`/marketplace/nft/${encodeURIComponent(nft.id)}`)
                }
              />
            ))}
          </div>

          {visibleNFTs < filtered.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleNFTs((v) => v + 24)}
                className="grad-aura px-6 py-3 rounded-xl text-white font-semibold"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
