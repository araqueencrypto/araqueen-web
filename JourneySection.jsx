import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";

export default function JourneySection() {
  const [pumpData, setPumpData] = useState([]);
  const [boopData, setBoopData] = useState([]);
  const [prices, setPrices] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
    BNB: 0,
    PUMP: 0,
    BOOP: 0,
    pumpPrice: 0,
    boopPrice: 0,
    pumpCap: 0,
    boopCap: 0,
  });

  // 🔹 Ambil harga global (BTC, ETH, SOL, BNB, PUMP, BOOP) dari CoinGecko
  const fetchGlobalPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,pump-fun,boop&vs_currencies=usd"
      );
      if (!res.ok) throw new Error("Failed to fetch global data");
      const data = await res.json();

      return {
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd,
        SOL: data.solana.usd,
        BNB: data.binancecoin.usd,
        PUMP: data["pump-fun"]?.usd || 0.00005,
        BOOP: data.boop?.usd || 0.00004,
      };
    } catch (err) {
      console.error("⚠️ Error fetching global prices:", err);
      return {};
    }
  };

  // 🔹 Ambil data ARAQ manual dari mock-prices.json
  const fetchMockAraq = async () => {
    try {
      const res = await fetch("/mock-prices.json");
      const data = await res.json();

      const pumpChart = data.pumpfun.chart || [];
      const boopChart = data.boopfun.chart || [];

      setPumpData(pumpChart);
      setBoopData(boopChart);

      return {
        pumpPrice: data.pumpfun.price || 0,
        boopPrice: data.boopfun.price || 0,
        pumpCap: data.pumpfun.market_cap || 0,
        boopCap: data.boopfun.market_cap || 0,
      };
    } catch (err) {
      console.error("⚠️ Failed to load mock-prices.json:", err);
      return {};
    }
  };

  // 🔹 Update data hybrid (live global + manual AraQ)
  const updateAll = async () => {
    const [global, araq] = await Promise.all([fetchGlobalPrices(), fetchMockAraq()]);
    setPrices((prev) => ({ ...prev, ...global, ...araq }));
  };

  useEffect(() => {
    updateAll();
    const interval = setInterval(updateAll, 15000); // update setiap 15 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="journey"
      className="min-h-screen py-20 bg-gradient-to-b from-white via-pink-50 to-yellow-50 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,200,255,0.15),_transparent_70%)]"></div>

      <div className="max-w-6xl mx-auto px-6 z-10">
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Royal Market of AraQueen 💹
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Live global market prices with manual AraQ performance tracking across Pump.fun & Boop.fun.
        </p>

        {/* 🔹 Global Market Prices */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 bg-white/70 border border-pink-100 rounded-2xl px-6 py-4 backdrop-blur-md shadow-inner">
          {[
            ["BTC", prices.BTC],
            ["ETH", prices.ETH],
            ["BNB", prices.BNB],
            ["SOL", prices.SOL],
            ["PUMP", prices.PUMP],
            ["BOOP", prices.BOOP],
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

        {/* 🔸 Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* --- Pump.fun Chart --- */}
          <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-yellow-300 opacity-30 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-pink-600">Pump.fun Market</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Market Cap:{" "}
                  <span className="text-pink-600 font-bold">
                    ${prices.pumpCap.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  ARAQ Price:{" "}
                  <span className="text-pink-600 font-bold">${prices.pumpPrice.toFixed(6)}</span>
                </p>
              </div>
              <a
                href="https://pump.fun/coin/7rJdmuRH3rBYj6cCCfzn2idkPtcRKiTofsZgMbV1pump"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
              >
                Buy on Pump.fun
              </a>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={pumpData}>
                <XAxis dataKey="time" tick={{ fill: "#888", fontSize: 10 }} stroke="#fbcfe8">
                  <Label value="Time" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis tick={{ fill: "#888", fontSize: 10 }} stroke="#fbcfe8" domain={["auto", "auto"]}>
                  <Label value="Price (USD)" angle={-90} position="insideLeft" offset={-5} />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "8px",
                    border: "1px solid #fbcfe8",
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="#ec4899" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* --- Boop.fun Chart --- */}
          <div className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-400 opacity-30 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-yellow-600">Boop.fun Market</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Market Cap:{" "}
                  <span className="text-yellow-600 font-bold">
                    ${prices.boopCap.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  ARAQ Price:{" "}
                  <span className="text-yellow-600 font-bold">${prices.boopPrice.toFixed(6)}</span>
                </p>
              </div>
              <a
                href="https://boop.fun/coin/7rJdmuRH3rBYj6cCCfzn2idkPtcRKiTofsZgMbV1pump"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
              >
                Buy on Boop.fun
              </a>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={boopData}>
                <XAxis dataKey="time" tick={{ fill: "#888", fontSize: 10 }} stroke="#fde68a">
                  <Label value="Time" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis tick={{ fill: "#888", fontSize: 10 }} stroke="#fde68a" domain={["auto", "auto"]}>
                  <Label value="Price (USD)" angle={-90} position="insideLeft" offset={-5} />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "8px",
                    border: "1px solid #fde68a",
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 italic">“The market is the heartbeat of the kingdom.” 👑</p>
      </div>
    </section>
  );
}
