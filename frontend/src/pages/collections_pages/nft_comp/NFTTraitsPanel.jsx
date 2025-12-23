// NFTTraitsPanel.jsx — METADATA PANEL (BACKEND-DRIVEN)
import React, { useState } from "react";

/* ===== UTIL ===== */
const shortAddr = (addr) =>
  addr ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : "-";

export default function NFTTraitsPanel({ nft }) {
  const [copied, setCopied] = useState(false);

  const copyMint = () => {
    if (!nft?.mint_address) return;
    navigator.clipboard.writeText(nft.mint_address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (!nft) {
    return (
      <div className="text-sm text-gray-400">
        Metadata unavailable.
      </div>
    );
  }

  return (
    <div className="glass border rounded-2xl p-4 space-y-4">
      <div className="text-sm font-semibold grad-aura-text">
        NFT Metadata
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">

        {/* RARITY */}
        <div className="rounded-xl border border-white/10 p-3 bg-black/30">
          <div className="text-gray-400">Rarity</div>
          <div className="font-semibold text-pink-400">
            {nft.rarity || "—"}
          </div>
        </div>

        {/* EDITION */}
        <div className="rounded-xl border border-white/10 p-3 bg-black/30">
          <div className="text-gray-400">Edition</div>
          <div className="font-semibold text-white">
            {nft.edition ?? "—"}
          </div>
        </div>

        {/* MINT ADDRESS */}
        <div className="rounded-xl border border-white/10 p-3 bg-black/30 col-span-2">
          <div className="text-gray-400">Mint Address</div>

          <div className="flex items-center gap-2">
            <span
              className="font-mono text-white cursor-pointer hover:text-pink-400"
              onClick={copyMint}
              title="Click to copy"
            >
              {shortAddr(nft.mint_address)}
            </span>

            {copied && (
              <span className="text-[10px] text-green-400">
                Copied
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
