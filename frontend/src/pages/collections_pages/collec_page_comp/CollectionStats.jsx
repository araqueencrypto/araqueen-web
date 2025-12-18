// src/pages/collections/components/CollectionStats.jsx

import React from "react";
import { Share2, Heart, MoreHorizontal } from "lucide-react";

export default function CollectionStats({ stats }) {
  return (
    <div className="w-full space-y-4 mt-10">

      {/* Top action bar */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg md:text-xl font-bold grad-aura-text">
          Collection Stats
        </h2>

        <div className="flex items-center gap-2">
          <button className="p-2 bg-[var(--card-bg)] rounded-xl shadow-1 hover:shadow-focus transition">
            <Share2 size={20} className="text-[var(--fg)]" />
          </button>

          <button className="p-2 bg-[var(--card-bg)] rounded-xl shadow-1 hover:shadow-focus transition">
            <Heart size={20} className="text-[var(--fg)]" />
          </button>

          <button className="p-2 bg-[var(--card-bg)] rounded-xl shadow-1 hover:shadow-focus transition">
            <MoreHorizontal size={20} className="text-[var(--fg)]" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* ITEMS */}
        <div className="bg-[var(--card-bg)] border border-white/10 rounded-xl p-4 text-center shadow-1">
          <div className="text-gray-400 text-sm">Items</div>
          <div className="text-xl font-bold text-[var(--fg)]">
            {stats.items}
          </div>
        </div>

        {/* VOLUME */}
        <div className="bg-[var(--card-bg)] border border-white/10 rounded-xl p-4 text-center shadow-1">
          <div className="text-gray-400 text-sm">Total Volume</div>
          <div className="text-xl font-bold text-[var(--fg)]">
            {stats.volume.toFixed(2)}{" "}
            <span className="text-pink-500">SOL</span>
          </div>
        </div>

        {/* FLOOR */}
        <div className="bg-[var(--card-bg)] border border-white/10 rounded-xl p-4 text-center shadow-1">
          <div className="text-gray-400 text-sm">Floor Price</div>
          <div className="text-xl font-bold text-[var(--fg)]">
            {stats.floor} <span className="text-pink-500">SOL</span>
          </div>
        </div>

        {/* LISTED */}
        <div className="bg-[var(--card-bg)] border border-white/10 rounded-xl p-4 text-center shadow-1">
          <div className="text-gray-400 text-sm">Listed</div>
          <div className="text-xl font-bold text-[var(--fg)]">
            {stats.listed}
          </div>
        </div>
      </div>
    </div>
  );
}
