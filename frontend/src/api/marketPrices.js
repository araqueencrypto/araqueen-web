// ✅ Fetch harga global dari CoinGecko (termasuk PUMP & BOOP)
export const fetchMarketPrices = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,pump-fun,boop&vs_currencies=usd"
    );
    if (!res.ok) throw new Error("Failed to fetch market data");

    const data = await res.json();

    return {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      SOL: data.solana.usd,
      BNB: data.binancecoin.usd,
      PUMP: data["pump-fun"]?.usd || 0,
      BOOP: data.boop?.usd || 0
    };
  } catch (err) {
    console.error("⚠️ Failed to fetch market prices:", err);
    return {
      BTC: 0,
      ETH: 0,
      SOL: 0,
      BNB: 0,
      PUMP: 0,
      BOOP: 0
    };
  }
};
