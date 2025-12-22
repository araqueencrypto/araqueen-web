import React from "react";
import { useNavigate } from "react-router-dom";
import NFTcard from "../nft/NFTcard";

export default function NFTitem({ nft }) {
  const navigate = useNavigate();

  // ID untuk routing (mint_address lebih prioritas)
  const id = nft.mint_address || nft.id;

  // ✅ Backend base URL dari ENV (dev & prod aman)
  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // ✅ Image resolver (NO HARDCODE)
  const image =
    nft.image_url ||
    (nft.image_local
      ? `${backendBaseUrl}${nft.image_local}`
      : null) ||
    nft.image ||
    nft.image_link ||
    "/placeholder-nft.png";

  return (
    <div
      onClick={() =>
        navigate(`/marketplace/nft/${encodeURIComponent(id)}`)
      }
      className="cursor-pointer"
    >
      <NFTcard
        image={image}
        price={nft.list_price}
        change={nft.change24h}
      />
    </div>
  );
}
