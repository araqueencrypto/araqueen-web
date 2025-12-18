// collections/_utils/downloadAndCache.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { PublicKey, Connection } from "@solana/web3.js";

/**
 * downloadFile(url, destPath)
 * - men-download file binary sekali dan menyimpannya ke destPath
 * - mengembalikan path jika berhasil, null jika gagal
 */
export async function downloadFile(url, destPath) {
  try {
    if (!url) return null;
    // if already exists, skip
    if (fs.existsSync(destPath)) return destPath;

    const res = await fetch(url, { timeout: 30000 });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return destPath;
  } catch (err) {
    console.warn("downloadFile failed:", err.message, url);
    return null;
  }
}

/**
 * getCachedMetadata(cacheFolder, metadataUrl)
 * - menyimpan metadata JSON ke file lokal jika belum ada
 * - mengembalikan object metadata
 */
export async function getCachedMetadata(collectionFolder, idx, metadataUrl) {
  try {
    const metaDir = path.join(collectionFolder, "metadata");
    fs.mkdirSync(metaDir, { recursive: true });

    // use index-based filename so stable
    const ext = ".json";
    const metaPath = path.join(metaDir, `${idx}${ext}`);

    if (fs.existsSync(metaPath)) {
      // read cached metadata
      const raw = fs.readFileSync(metaPath, "utf8");
      return JSON.parse(raw);
    }

    // fetch remote metadata once and cache
    const res = await fetch(metadataUrl, { timeout: 20000 });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    fs.writeFileSync(metaPath, JSON.stringify(json, null, 2));
    return json;
  } catch (err) {
    console.warn("getCachedMetadata failed:", err.message, metadataUrl);
    return null;
  }
}

/**
 * owner cache functions
 * - owners are cached per-collection in owners.json { mint: { owner, ts } }
 * - TTL in seconds (default 60)
 */
export function readOwnersCache(collectionFolder) {
  const p = path.join(collectionFolder, "owners.json");
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return {};
  }
}

export function writeOwnersCache(collectionFolder, ownersObj) {
  const p = path.join(collectionFolder, "owners.json");
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(ownersObj, null, 2));
}

/**
 * getOnChainOwnerWithCache(connection, collectionFolder, mint, ttlSeconds)
 */
export async function getOnChainOwnerWithCache(connection, collectionFolder, mint, ttlSeconds = 60) {
  try {
    if (!mint) return null;
    const owners = readOwnersCache(collectionFolder);
    const now = Math.floor(Date.now() / 1000);

    if (owners[mint] && (now - (owners[mint].ts || 0) < ttlSeconds)) {
      return owners[mint].owner;
    }

    // fetch largest token accounts
    const largest = await connection.getTokenLargestAccounts(new PublicKey(mint));
    const largestAccount = largest.value?.[0]?.address;
    let owner = null;
    if (largestAccount) {
      const info = await connection.getParsedAccountInfo(new PublicKey(largestAccount));
      owner = info.value?.data?.parsed?.info?.owner || null;
    }

    // update cache
    owners[mint] = { owner, ts: now };
    writeOwnersCache(collectionFolder, owners);

    return owner;
  } catch (err) {
    console.warn("getOnChainOwnerWithCache failed:", err.message);
    return null;
  }
}
