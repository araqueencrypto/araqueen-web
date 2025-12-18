import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

export default function JourneySection() {
  const [pumpData, setPumpData] = useState([]);
  const [prices, setPrices] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
    BNB: 0,
    PUMP: 0,
    pumpPrice: 0,
    pumpCap: 0,
  });

  // 🔹 Ambil harga global dari CoinGecko
  const fetchGlobalPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,pump-fun&vs_currencies=usd"
      );
      if (!res.ok) throw new Error("Failed to fetch global data");
      const data = await res.json();
      return {
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd,
        SOL: data.solana.usd,
        BNB: data.binancecoin.usd,
        PUMP: data["pump-fun"]?.usd || 0.00005,
      };
    } catch (err) {
      console.error("⚠️ Error fetching global prices:", err);
      return {};
    }
  };

  // 🔹 Ambil data ARAQ manual
  const fetchMockAraq = async () => {
    try {
      const res = await fetch("/mock-prices.json");
      const data = await res.json();

      setPumpData(data.pumpfun.chart || []);
      return {
        pumpPrice: data.pumpfun.price || 0,
        pumpCap: data.pumpfun.market_cap || 0,
      };
    } catch (err) {
      console.error("⚠️ Failed to load mock-prices.json:", err);
      return {};
    }
  };

  const updateAll = async () => {
    const [global, araq] = await Promise.all([fetchGlobalPrices(), fetchMockAraq()]);
    setPrices((prev) => ({ ...prev, ...global, ...araq }));
  };

  useEffect(() => {
    updateAll();
    const interval = setInterval(updateAll, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="tokeninsigth"
      className="min-h-screen py-20 bg-gradient-to-b from-white via-pink-50 to-yellow-50 flex flex-col items-center text-center relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 z-10 w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Royal Market
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Live global market prices with manual AraQ performance tracking across Pump.fun.
        </p>

        {/* 🔹 Global Market Prices */}
        <div className="max-w-4xl w-full flex flex-wrap justify-center gap-4 mb-10 bg-white/70 border border-pink-100 rounded-2xl px-6 py-4 backdrop-blur-md shadow-inner mx-auto">
          {[
            ["BTC", prices.BTC],
            ["ETH", prices.ETH],
            ["BNB", prices.BNB],
            ["SOL", prices.SOL],
            ["PUMP", prices.PUMP],
          ].map(([symbol, val]) => (
            <div
              key={symbol}
              className="flex items-center gap-2 text-gray-700 font-medium text-sm bg-white/50 rounded-full px-4 py-2 shadow-sm hover:scale-105 transition-transform"
            >
              <img src={`/${symbol.toLowerCase()}.png`} alt={symbol} className="w-5 h-5" />
              <span>{symbol}</span>
              <span className="font-semibold text-pink-500">
                {val ? `$${val > 1 ? val.toFixed(2) : val.toFixed(6)}` : "…"}
              </span>
            </div>
          ))}
        </div>

      
        {/* Divider */}
        <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 italic">“The market is the heartbeat of the kingdom.” 👑</p>
      </div>
    </section>
  );
}
