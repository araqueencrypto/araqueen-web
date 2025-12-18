-- Hapus tabel jika ada
DROP TABLE IF EXISTS nfts;

-- Buat tabel NFT baru
CREATE TABLE nfts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection TEXT NOT NULL,
  nft_index INTEGER NOT NULL,
  name TEXT,
  description TEXT,
  image_local TEXT,
  metadata_link TEXT,
  mint_address TEXT,
  owner_address TEXT,
  symbol TEXT,
  list_price TEXT,
  rarity TEXT,
  edition TEXT,
  royalty TEXT,
  updatedAt TEXT
);

-- Optional: index untuk mempercepat query
CREATE INDEX idx_collection ON nfts (collection);
CREATE INDEX idx_index ON nfts (nft_index);
