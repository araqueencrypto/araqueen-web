import React from "react";
import { useNavigate } from "react-router-dom";
import NFTcard from "../nft/NFTcard";

export default function NFTitem({ nft }) {
  const navigate = useNavigate();
  const id = nft.mint_address || nft.id;

  // 🔥 WAJIB: gunakan image_url hasil normalisasi
  const image =
    nft.image_url ||
    (nft.image_local ? `http://localhost:8080${nft.image_local}` : null) ||
    nft.image ||
    nft.image_link ||
    "/placeholder-nft.png";

  return (
    <div
      onClick={() => navigate(`/marketplace/nft/${encodeURIComponent(id)}`)}
      className="cursor-pointer"
    >
      <NFTcard image={image} price={nft.list_price} change={nft.change24h} />
    </div>
  );
}
