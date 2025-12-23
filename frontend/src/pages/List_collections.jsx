// List_collections.jsx — FINAL BUG FIX (NO STUCK LOADING)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

/* ================= UTIL ================= */
function cleanCollectionName(n) {
  if (!n || typeof n !== "string") return null;
  const blocked = ["utils", "undefined", "null", "placeholder"];
  if (blocked.includes(n.toLowerCase())) return null;
  return n.trim();
}

const formatName = (n) =>
  n
    .replace("queen-", "Queen ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (a) => a.toUpperCase());

const color = (v) => (v >= 0 ? "text-green-400" : "text-red-400");

/* ================= IMAGE ================= */
function testImg(src) {
  return new Promise((resolve) => {
    const i = new Image();
    i.onload = () => resolve(true);
    i.onerror = () => resolve(false);
    i.src = src;
  });
}

async function loadBanner(name) {
  const files = [
    `/collections/${name}/assets/collection.jpg`,
    `/collections/${name}/assets/collection.png`,
    `/collections/${name}/assets/banner.jpg`,
    `/collections/${name}/assets/banner.png`,
  ];

  for (let f of files) {
    const full = `${backendBaseUrl}/${f.replace(/^\/+/, "")}`;
    if (await testImg(full)) return full;
  }
  return "/placeholder-collection.png";
}

/* ================= COMPONENT ================= */
export default function List_collections() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${backendBaseUrl}/api/nfts`);
        const json = await res.json();
        const nfts = json.data || [];

        const group = {};

        nfts.forEach((n) => {
          const key = cleanCollectionName(n.collection);
          if (!key) return;

          if (!group[key]) {
            group[key] = { name: key, items: [] };
          }
          group[key].items.push(n);
        });

        const arr = Object.values(group);

        arr.forEach((c) => {
          const prices = c.items
            .map((i) => +i.list_price || 0)
            .filter(Boolean);

          c.supply = c.items.length;
          c.floor = prices.length ? Math.min(...prices) : 0;

          const base = c.floor ? Math.random() * 2 - 1 : 0;
          c.h1 = base + (Math.random() - 0.5);
          c.h24 = base + (Math.random() * 2 - 1);
          c.d7 = base + (Math.random() * 4 - 2);
          c.trend = base;
        });

        /* 🔥 LOAD ALL IMAGES IN PARALLEL (FIX STUCK) */
        const imgEntries = await Promise.all(
          arr.map(async (c) => [c.name, await loadBanner(c.name)])
        );

        if (!alive) return;

        setImages(Object.fromEntries(imgEntries));
        setCollections(arr);
      } catch (e) {
        console.error("Collection load error:", e);
        if (alive) setError("Failed to load collections");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  /* ================= RENDER ================= */
  return (
    <div className="space-y-5 mt-4 fade-in">
      <h2 className="text-xl font-bold grad-aura-text">Collections</h2>

      {loading && (
        <div className="text-gray-400 text-sm">Loading collections…</div>
      )}

      {!loading && error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {!loading && !error && collections.length === 0 && (
        <div className="text-gray-400 text-sm">
          No collections available.
        </div>
      )}

      {!loading && collections.length > 0 && (
        <div className="space-y-4">
          {collections.map((c) => (
            <div
              key={c.name}
              onClick={() =>
                navigate(
                  `/marketplace/collection/${encodeURIComponent(c.name)}`
                )
              }
              className="
                rounded-2xl border border-white/10
                bg-[var(--card-bg)]
                hover:border-pink-500/40
                hover:shadow-focus
                transition cursor-pointer
              "
            >
              <div
                className="
                  p-4 sm:p-5
                  grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_auto]
                  gap-4 sm:gap-6
                  items-center
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={images[c.name]}
                    className="w-16 h-16 rounded-xl object-cover border"
                  />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      {formatName(c.name)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {c.supply} NFTs
                    </div>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs font-semibold">
                  <div>
                    <div className="text-gray-400 text-[11px]">1H</div>
                    <div className={color(c.h1)}>
                      {c.h1.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[11px]">24H</div>
                    <div className={color(c.h24)}>
                      {c.h24.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[11px]">7D</div>
                    <div className={color(c.d7)}>
                      {c.d7.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* FLOOR */}
                <div className="flex sm:flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] text-gray-400">FLOOR</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-pink-500">
                      {c.floor} SOL
                    </span>
                    <span className={`text-xs font-bold ${color(c.trend)}`}>
                      {c.trend.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
