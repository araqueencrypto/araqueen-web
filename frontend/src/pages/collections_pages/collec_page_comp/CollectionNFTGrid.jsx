import React from "react";
import { useNavigate } from "react-router-dom";

import NFTcard from "../nft_comp/NFTcard";

export default function CollectionNFTGrid({ nfts }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {nfts.map((nft) => {
        const mint = nft.mint_address || nft.id;

        return (
          <NFTcard
            key={mint}
            nft={nft}
            onClick={() =>
              navigate(`/marketplace/nft/${encodeURIComponent(mint)}`)
            }
          />
        );
      })}
    </div>
  );
}
