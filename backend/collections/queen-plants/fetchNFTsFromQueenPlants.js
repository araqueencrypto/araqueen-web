// fetchNFTsFromQueenPlants.js — FINAL PATCH
// Mengikuti struktur queen-colors 100% + Auto Banner + Auto Image
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { getOnChainOwnerWithCache } from "../_utils/downloadAndCache.js";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RPC dan owner wallet
const RPC = "https://api.devnet.solana.com";
const OWNER = new PublicKey("4qQvH8MNZrBKNdgMcCxsh4EzgJR6vTTifMWhXmGF8xvw");

// NAMA KOLEKSI
const COLLECTION = "queen-plants";

// Folder koleksi ini
const BASE_FOLDER = path.join(__dirname);
const ASSETS = path.join(BASE_FOLDER, "assets");

export const fetchNFTsFromQueenPlants = async () => {
  try {
    const cachePath = path.join(BASE_FOLDER, "cache.json");

    if (!fs.existsSync(cachePath)) {
      console.warn(`[${COLLECTION}] cache.json not found`);
      return [];
    }

    const cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    const items = cache.items || {};

    // Ambil urutan NFT
    const indices = Object.keys(items)
      .filter((i) => i !== "-1")
      .sort((a, b) => Number(a) - Number(b));

    const connection = new Connection(RPC);
    const metaplex = Metaplex.make(connection);

    // -----------------------
    // 🔥 DETEKSI BANNER OTOMATIS
    // -----------------------
    const banners = [
      "collection.jpg",
      "collection.png",
      "banner.jpg",
      "banner.png",
      "cover.jpg",
      "cover.png",
    ];

    let detectedBanner = null;
    for (const f of banners) {
      if (fs.existsSync(path.join(ASSETS, f))) {
        detectedBanner = `/collections/${COLLECTION}/assets/${f}`;
        break;
      }
    }
    if (!detectedBanner) detectedBanner = "/placeholder-collection.png";

    // -----------------------
    // 🔥 UPDATE MINT ADDRESS (jika belum)
    // -----------------------
    const allMintReady = indices.every((i) => items[i].mint_address);
    let uriToMint = {};

    if (!allMintReady) {
      try {
        console.log(`[${COLLECTION}] Updating mint addresses`);

        const targetUris = indices.map((i) => items[i].metadata_link);
        const walletNFTs = await metaplex.nfts().findAllByOwner({ owner: OWNER });

        for (const nft of walletNFTs) {
          if (nft.uri && targetUris.includes(nft.uri)) {
            uriToMint[nft.uri] = nft.mintAddress.toBase58();
          }
        }

        let updated = false;
        for (const i of indices) {
          const uri = items[i].metadata_link;
          if (uriToMint[uri] && !items[i].mint_address) {
            items[i].mint_address = uriToMint[uri];
            updated = true;
          }
        }

        if (updated) {
          fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
          console.log(`[${COLLECTION}] mint address updated in cache.json`);
        }
      } catch (err) {
        console.warn(`[${COLLECTION}] mint scan failed:`, err.message);
      }
    }

    // -----------------------
    // 🔥 BUILD NFT DATA
    // -----------------------
    const results = [];

    for (const i of indices) {
      const item = items[i];

      // baca metadata JSON lokal
      const localJson = path.join(ASSETS, `${i}.json`);
      let meta = {};
      if (fs.existsSync(localJson)) {
        meta = JSON.parse(fs.readFileSync(localJson, "utf8"));
      }

      // deteksi gambar NFT (jpg/png)
      const jpg = path.join(ASSETS, `${i}.jpg`);
      const png = path.join(ASSETS, `${i}.png`);
      let imageLocal = `/collections/${COLLECTION}/assets/${i}.jpg`;
      if (!fs.existsSync(jpg) && fs.existsSync(png))
        imageLocal = `/collections/${COLLECTION}/assets/${i}.png`;

      // deteksi owner dari chain
      let owner_address = OWNER.toBase58();
      if (item.mint_address) {
        try {
          owner_address = await getOnChainOwnerWithCache(
            connection,
            BASE_FOLDER,
            item.mint_address,
            60
          );
        } catch {
          console.warn(`[${COLLECTION}] owner lookup failed ${item.mint_address}`);
        }
      }

      // seller fee
      const bps =
        meta.seller_fee_basis_points ??
        cache.program?.seller_fee_basis_points ??
        null;
      const royalty = bps ? `${bps / 100}%` : "-";

      // price fallback
      const list_price =
        meta.list_price && meta.list_price !== ""
          ? meta.list_price
          : item.list_price && item.list_price !== ""
          ? item.list_price
          : "0.15";

      // ✔ hasil final NFT object
      results.push({
        collection: COLLECTION,
        nft_index: Number(i),
        name: meta.name || item.name || `NFT #${i}`,
        description: meta.description || "",
        image_local: imageLocal,

        // 🔥 BANNER KOLEKSI
        collection_banner: detectedBanner,

        metadata_link: item.metadata_link,
        mint_address: item.mint_address,
        owner_address,
        symbol: meta.symbol || "AraQ",
        list_price,
        rarity:
          meta.attributes?.find((x) => x.trait_type?.toLowerCase() === "tier")
            ?.value || "-",
        edition:
          meta.attributes?.find((x) => x.trait_type?.toLowerCase() === "edition")
            ?.value || "-",
        attributes: meta.attributes || [],
        royalty,
        seller_fee_basis_points: bps,
        updatedAt: new Date().toISOString(),
      });
    }

    return results;
  } catch (err) {
    console.error(`[${COLLECTION}] ERROR:`, err.message);
    return [];
  }
};
