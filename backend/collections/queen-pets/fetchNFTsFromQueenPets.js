// fetchNFTsFromQueenPets.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { getOnChainOwnerWithCache } from "../_utils/downloadAndCache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RPC = "https://api.devnet.solana.com";
const OWNER = new PublicKey("4qQvH8MNZrBKNdgMcCxsh4EzgJR6vTTifMWhXmGF8xvw");

const COLLECTION = "queen-pets";
const BASE_FOLDER = path.join(__dirname);

export const fetchNFTsFromQueenPets = async () => {
  try {
    const cachePath = path.join(BASE_FOLDER, "cache.json");
    const assetsFolder = path.join(BASE_FOLDER, "assets");

    if (!fs.existsSync(cachePath)) {
      console.warn(`[${COLLECTION}] cache.json not found`);
      return [];
    }

    const cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    const items = cache.items || {};

    const indices = Object.keys(items)
      .filter((i) => i !== "-1")
      .sort((a, b) => Number(a) - Number(b));

    const connection = new Connection(RPC);
    const metaplex = Metaplex.make(connection);

    // update mint addresses if needed
    const allMintReady = indices.every((i) => items[i].mint_address);
    let uriToMint = {};
    if (!allMintReady) {
      try {
        console.log(`[${COLLECTION}] Updating mint addresses (one-time)`);
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
          console.log(`[${COLLECTION}] cache.json updated`);
        }
      } catch (err) {
        console.warn(`[${COLLECTION}] mint fetch skipped:`, err.message);
      }
    }

    // auto-detect banner
    const bannerCandidates = [
      "collection.jpg",
      "collection.png",
      "banner.jpg",
      "banner.png",
      "cover.jpg",
      "cover.png",
    ];
    let detectedBanner = null;
    for (const b of bannerCandidates) {
      if (fs.existsSync(path.join(assetsFolder, b))) {
        detectedBanner = `/collections/${COLLECTION}/assets/${b}`;
        break;
      }
    }
    if (!detectedBanner) detectedBanner = "/placeholder-collection.png";

    const results = [];
    for (const i of indices) {
      const item = items[i];
      const localJsonPath = path.join(assetsFolder, `${i}.json`);
      let meta = {};
      if (fs.existsSync(localJsonPath)) {
        meta = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));
      }

      const imageLocalJpg = path.join(assetsFolder, `${i}.jpg`);
      const imageLocalPng = path.join(assetsFolder, `${i}.png`);
      let imageLocal = `/collections/${COLLECTION}/assets/${i}.jpg`;
      if (!fs.existsSync(imageLocalJpg) && fs.existsSync(imageLocalPng)) {
        imageLocal = `/collections/${COLLECTION}/assets/${i}.png`;
      }

      // owner detection
      let owner_address = OWNER.toBase58();
      if (item.mint_address) {
        try {
          owner_address = await getOnChainOwnerWithCache(
            connection,
            BASE_FOLDER,
            item.mint_address,
            60
          );
        } catch (e) {
          console.warn(`[${COLLECTION}] owner lookup failed for ${item.mint_address}`);
        }
      }

      const bps =
        meta.seller_fee_basis_points ??
        cache.program?.seller_fee_basis_points ??
        null;
      const royalty = bps ? `${bps / 100}%` : "-";

      const list_price =
        meta.list_price && meta.list_price !== ""
          ? meta.list_price
          : item.list_price && item.list_price !== ""
          ? item.list_price
          : "0.15";

      results.push({
        collection: COLLECTION,
        nft_index: Number(i),
        name: meta.name || item.name || `NFT #${i}`,
        description: meta.description || "",
        image_local: imageLocal,
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
