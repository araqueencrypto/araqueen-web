// db.js — FINAL PATCH with collection_banner support
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lokasi database asli kamu
const dbPath = path.join(__dirname, "nfts.db");

const db = new Database(dbPath);

// Buat tabel kalau belum ada
db.exec(`
CREATE TABLE IF NOT EXISTS nfts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection TEXT,
  nft_index INTEGER,
  name TEXT,
  description TEXT,
  image_local TEXT,
  collection_banner TEXT,       -- 🔥 DITAMBAHKAN DI SINI
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
`);

// Jika database lama sudah terlanjur dibuat TANPA kolom collection_banner,
// kita tambahkan kolomnya (ALTER TABLE tidak masalah jika kolom belum ada)
try {
  db.exec(`ALTER TABLE nfts ADD COLUMN collection_banner TEXT;`);
  console.log("🆕 column 'collection_banner' added to nfts table");
} catch (err) {
  if (err.message.includes("duplicate column")) {
    console.log("✔ column 'collection_banner' already exists");
  } else {
    console.error("❌ error adding collection_banner column:", err.message);
  }
}

export default db;
