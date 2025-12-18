// CollectionBanner.jsx — POLISHED PREMIUM VERSION

import React, { useState, useEffect } from "react";

export default function CollectionBanner({ name, stats, backendBaseUrl }) {
  if (!name) return null;

  const fallback = "/placeholder-collection.png";
  const [banner, setBanner] = useState(fallback);

  const candidates = [
    `${backendBaseUrl}/collections/${name}/assets/collection.jpg`,
    `${backendBaseUrl}/collections/${name}/assets/collection.png`,
    `${backendBaseUrl}/collections/${name}/assets/banner.jpg`,
    `${backendBaseUrl}/collections/${name}/assets/banner.png`,
    `${backendBaseUrl}/collections/${name}/assets/cover.jpg`,
  ];

  useEffect(() => {
    let active = true;
    setBanner(fallback);

    const test = (src) =>
      new Promise((resolve) => {
        const i = new Image();
        i.onload = () => resolve(true);
        i.onerror = () => resolve(false);
        i.src = src;
      });

    const load = async () => {
      for (let url of candidates) {
        if (await test(url)) {
          if (active) setBanner(url);
          return;
        }
      }
    };

    load();
    return () => (active = false);
  }, [name]);

  return (
    <div className="grad-aura-border rounded-3xl p-[1px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="relative rounded-3xl overflow-hidden bg-[var(--card-bg)]">

        <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 relative">
          <img
            src={banner}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
        </div>

        <div className="absolute top-6 left-8 text-white font-bold text-3xl 
                        drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)] tracking-wide">
          {name.replace("queen-", "Queen ")}
        </div>

      </div>
    </div>
  );
}
