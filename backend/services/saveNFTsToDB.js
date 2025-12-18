// services/saveNFTsToDB.js (PATCH FINAL)

import db from "../database/db.js";

export function saveNFTsToDB(allNFTs) {
  // Clear previous data
  db.exec(`DELETE FROM nfts`);

  const stmt = db.prepare(`
    INSERT INTO nfts (
      collection,
      nft_index,
      name,
      description,
      image_local,
      collection_banner,
      metadata_link,
      mint_address,
      owner_address,
      symbol,
      list_price,
      rarity,
      edition,
      royalty,
      updatedAt
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);

  const insert = db.transaction((rows) => {
    for (const n of rows) {
      stmt.run(
        n.collection,
        n.nft_index,
        n.name,
        n.description,
        n.image_local,
        n.collection_banner, // <-- 🔥 NEW FIELD
        n.metadata_link,
        n.mint_address,
        n.owner_address,
        n.symbol,
        n.list_price,
        n.rarity,
        n.edition,
        n.royalty,
        n.updatedAt
      );
    }
  });

  insert(allNFTs);

  console.log(`💾 Saved ${allNFTs.length} NFTs to database (with banners)`);
}
