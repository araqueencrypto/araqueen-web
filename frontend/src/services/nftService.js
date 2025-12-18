// src/services/nftService.js
const backendBaseUrl = "http://localhost:8080";

export async function getAllNFTs() {
  const r = await fetch(`${backendBaseUrl}/api/nfts`);
  const json = await r.json();
  return json.data || [];
}

export async function getCollectionNFTs(collectionName) {
  const all = await getAllNFTs();
  return all.filter((n) => n.collection === collectionName);
}

export async function getNFTDetail(idOrMint) {
  // try by id or mint
  try {
    const r = await fetch(`${backendBaseUrl}/api/nfts/${encodeURIComponent(idOrMint)}`);
    const json = await r.json();
    if (json && json.success && json.data) return json.data;
  } catch (err) {
    // fallback: search in all
  }

  const all = await getAllNFTs();
  return all.find((n) => (n.mint_address === idOrMint || String(n.id) === String(idOrMint)));
}

export async function getActivity(mintAddress) {
  // Temporary: dummy activity data — replace with backend route later
  // return fetch(`${backendBaseUrl}/api/activity/${mintAddress}`).then(r => r.json())
  return [
    { type: "LIST", price: 0.15, time: "2025-11-17T12:21:00Z", user: "4qQvH8...F8xvw" },
    { type: "BID", price: 0.12, time: "2025-11-16T09:00:00Z", user: "AD9...xX1" },
    { type: "SALE", price: 0.10, time: "2025-11-10T14:30:00Z", user: "Buyer123" },
  ];
}
