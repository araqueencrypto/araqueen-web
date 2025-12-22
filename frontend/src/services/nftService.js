// src/services/nftService.js

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

// =======================
// GET ALL NFTS
// =======================
export async function getAllNFTs() {
  const r = await fetch(`${backendBaseUrl}/api/nfts`);
  const json = await r.json();
  return json?.data || [];
}

// =======================
// GET COLLECTION NFTS
// =======================
export async function getCollectionNFTs(collectionName) {
  const all = await getAllNFTs();
  return all.filter((n) => n.collection === collectionName);
}

// =======================
// GET NFT DETAIL
// =======================
export async function getNFTDetail(idOrMint) {
  try {
    const r = await fetch(
      `${backendBaseUrl}/api/nfts/${encodeURIComponent(idOrMint)}`
    );
    const json = await r.json();

    if (json && json.success && json.data) {
      return json.data; // ✅ RETURN NFT OBJECT
    }
  } catch (err) {
    console.error("getNFTDetail fetch error:", err);
  }

  // fallback: search locally
  const all = await getAllNFTs();
  return all.find(
    (n) =>
      n.mint_address === idOrMint ||
      String(n.id) === String(idOrMint)
  );
}

// =======================
// GET ACTIVITY (TEMP / MOCK)
// =======================
export async function getActivity(mintAddress) {
  // TODO: replace with backend endpoint later
  return [
    { type: "LIST", price: 0.15, time: "2025-11-17T12:21:00Z", user: "4qQvH8...F8xvw" },
    { type: "BID", price: 0.12, time: "2025-11-16T09:00:00Z", user: "AD9...xX1" },
    { type: "SALE", price: 0.10, time: "2025-11-10T14:30:00Z", user: "Buyer123" },
  ];
}
