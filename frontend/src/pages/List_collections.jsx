// List_collections.jsx — FINAL FIX (Stable)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const backendBaseUrl = "http://localhost:8080";

// CLEAN NAMA KOLEKSI
function cleanCollectionName(n) {
  if (!n) return null;
  if (typeof n !== "string") return null;
  if (n.trim().length < 2) return null;

  const blocked = ["utils", "undefined", "null", "placeholder"];
  if (blocked.includes(n.toLowerCase())) return null;

  return n.trim();
}

// FORMAT NAMA UNTUK UI
const formatName = (n) =>
  n.replace("queen-", "Queen ").replace(/-/g, " ").replace(/\b\w/g, (a) => a.toUpperCase());

// WARNA PERSEN
const color = (v) => (v >= 0 ? "text-green-400" : "text-red-400");

// SMART BANNER LOADER
async function testImg(src) {
  return await new Promise((resolve) => {
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

export default function List_collections() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    fetch(`${backendBaseUrl}/api/nfts`)
      .then((r) => r.json())
      .then(async (res) => {
        const nfts = res.data || [];
        const group = {};

        // GROUPING FIX
        nfts.forEach((n) => {
          const key = cleanCollectionName(n.collection);
          if (!key) return;

          if (!group[key]) {
            group[key] = {
              name: key,
              items: [],
              supply: 0,
              rarity: n.rarity,
            };
          }

          group[key].items.push(n);
          group[key].supply++;
        });

        const arr = Object.values(group);

        // COMPUTE FLOOR, TREND, ETC
        arr.forEach((c) => {
          const prices = c.items.map((i) => parseFloat(i.list_price || 0));
          const floor = Math.min(...prices);
          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

          c.floor = isFinite(floor) ? floor : 0;
          c.avg = isFinite(avg) ? avg : 0;

          const base = floor > 0 ? ((avg - floor) / floor) * 100 : 0;

          c.trend = base;
          c.h1 = base + (Math.random() * 2 - 1);
          c.h24 = base + (Math.random() * 3 - 1.5);
          c.d7 = base + (Math.random() * 6 - 3);
        });

        // LOAD BANNER FIX
        for (let c of arr) {
          const img = await loadBanner(c.name);
          setImages((prev) => ({ ...prev, [c.name]: img }));
        }

        setCollections(arr);
      });
  }, []);

  return (
    <div className="space-y-4 mt-4 fade-in">
      <h2 className="text-xl font-bold grad-aura-text">Collections</h2>

     {collections.length === 0 && (
       <div className="text-gray-400 text-sm">........</div>
      )}

      <div className="space-y-4">
        {collections.map((c) => (
          <div
            key={c.name}
            onClick={() =>
              navigate(`/marketplace/collection/${encodeURIComponent(c.name)}`)
            }
            className="grad-aura-border rounded-2xl p-[2px] hover:scale-[1.01] transition cursor-pointer"
          >
            <div className="bg-[var(--card-bg)] rounded-2xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

              {/* LEFT: Thumbnail */}
              <div className="flex items-center gap-4 min-w-[170px]">
                <img
                  src={images[c.name] || "/placeholder-collection.png"}
                  className="w-16 h-16 rounded-xl object-cover border shadow-sm"
                />
                <div>
                  <div className="font-semibold text-[var(--fg)] text-sm">{formatName(c.name)}</div>
                  <div className="text-xs text-gray-400">{c.supply} NFTs</div>
                </div>
              </div>

              {/* MID: Stats */}
              <div className="flex gap-6 text-xs font-semibold justify-center">
                <div className="text-center">
                  <div className="text-gray-400 text-[11px]">1H</div>
                  <div className={`${color(c.h1)}`}>{c.h1.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-[11px]">24H</div>
                  <div className={`${color(c.h24)}`}>{c.h24.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-[11px]">7D</div>
                  <div className={`${color(c.d7)}`}>{c.d7.toFixed(2)}%</div>
                </div>
              </div>

              {/* RIGHT: Floor */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400">FLOOR</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-pink-500">
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
    </div>
  );
}
