import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid3X3, List } from "lucide-react";

import NFTcard from "./collections_pages/nft_comp/NFTcard";

const backendBaseUrl = "http://localhost:8080";

export default function NFTGallery() {
  const [nfts, setNfts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleNFTs, setVisibleNFTs] = useState(24);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default"); // New state for sorting
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Ambil ?parent=queen-punk (collection name)
  const params = new URLSearchParams(location.search);
  const parent = params.get("parent") || null;

  useEffect(() => {
    fetch(`${backendBaseUrl}/api/nfts`)
      .then((r) => r.json())
      .then((d) => {
        setNfts(d.data || []);
        setFiltered(d.data || []);
        setLoading(false);
      });

    setFavorites(JSON.parse(localStorage.getItem("favNFTs") || "[]"));
  }, []);

  // FILTER AND SORT BASED ON: search + direct collection match + sortBy
  useEffect(() => {
    const timer = setTimeout(() => {
      let res = nfts.filter((i) => {
        const nameMatch = (i.name || "")
          .toLowerCase()
          .includes(search.toLowerCase());

        // Jika tidak ada parent → tampilkan semua NFT
        if (!parent) return nameMatch;

        // BACKEND menggunakan 1-level collection saja
        const sameCollection = i.collection === parent;

        return sameCollection && nameMatch;
      });

      // Apply sorting
      if (sortBy === "latest") {
        // Assuming higher nft_index or id means newer; adjust if you have a timestamp field
        res = res.sort((a, b) => (b.nft_index || b.id) - (a.nft_index || a.id));
      } else if (sortBy === "high_price") {
        res = res.sort((a, b) => parseFloat(b.list_price || 0) - parseFloat(a.list_price || 0));
      } else if (sortBy === "low_price") {
        res = res.sort((a, b) => parseFloat(a.list_price || 0) - parseFloat(b.list_price || 0));
      }
      // 'default' uses backend sort (by collection, nft_index)

      setFiltered(res);
    }, 250);

    return () => clearTimeout(timer);
  }, [search, nfts, parent, sortBy]); // Added sortBy to dependencies

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favNFTs", JSON.stringify(updated));
  };

  const loadMore = () => {
    setVisibleNFTs((prev) => prev + 25);
  };

  return (
    <div className="space-y-6">

      {/* SEARCH BAR + VIEW MODES + SORT FILTER */}
      <div className="flex items-center gap-3">
        <input
          className="flex-1 px-4 py-2 rounded-xl border bg-[var(--card-bg)] text-[var(--fg)]"
          placeholder={
            parent
              ? `Search NFTs in ${parent}...`
              : "Search all NFTs..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-[var(--card-bg)] text-[var(--fg)] cursor-pointer"
        >
          <option value="latest">Latest</option>
          <option value="high_price">Highest Price</option>
          <option value="low_price">Lowest Price</option>
        </select>

        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-xl border ${
            viewMode === "grid"
              ? "bg-[var(--brand-a)] text-white"
              : "bg-[var(--card-bg)] text-[var(--fg)]"
          }`}
        >
          <Grid3X3 size={18} />
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-xl border ${
            viewMode === "list"
              ? "bg-[var(--brand-a)] text-white"
              : "bg-[var(--card-bg)] text-[var(--fg)]"
          }`}
        >
          <List size={18} />
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center text-gray-400">Loading NFTs...</div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                : "space-y-4"
            }
          >
            {filtered.slice(0, visibleNFTs).map((nft) => {
              const id = nft.mint_address || nft.id;

              return (
                <NFTcard
                  key={id}
                  nft={nft}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onClick={() =>
                    navigate(`/marketplace/nft/${encodeURIComponent(id)}`)
                  }
                />
              );
            })}
          </div>

          {visibleNFTs < filtered.length && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                className="grad-aura px-6 py-3 rounded-xl text-white font-semibold 
                  shadow-[0_0_12px_rgba(255,255,255,0.18)] hover:brightness-110 transition"
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