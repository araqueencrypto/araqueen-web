import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function JourneySection() {
  const [pumpData, setPumpData] = useState([]);
  const [boopData, setBoopData] = useState([]);
  const [treasury, setTreasury] = useState(182000);
  const [priceAlert, setPriceAlert] = useState(null);

  // Dummy price list (nanti dihubungkan ke API)
  const [prices, setPrices] = useState({
    BTC: 68000,
    ETH: 3300,
    BNB: 585,
    SOL: 175,
    USDT: 1,
    PUMP: 0.00005,
    BOOP: 0.00004,
  });

  // 🔹 Dummy chart awal
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      price: 0.00005 + Math.sin(i / 2) * 0.00001,
    }));
    setPumpData(initialData);
    setBoopData(initialData);
  }, []);

  // 🔹 Update data simulasi
  useEffect(() => {
    const interval = setInterval(() => {
      // Update dummy harga koin
      setPrices((prev) => ({
        ...Object.fromEntries(
          Object.entries(prev).map(([key, val]) => [
            key,
            val + (Math.random() - 0.5) * val * 0.002, // fluktuasi 0.2%
          ])
        ),
      }));

      // Update treasury & chart
      setPumpData((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, price: 0.00005 + Math.random() * 0.00002 },
      ]);
      setBoopData((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, price: 0.00004 + Math.random() * 0.000015 },
      ]);
      setTreasury((t) => t + Math.floor(Math.random() * 80));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="journey"
      className="min-h-screen py-20 bg-gradient-to-b from-white via-pink-50 to-yellow-50 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,200,255,0.15),_transparent_70%)]"></div>

      <div className="max-w-6xl mx-auto px-6 z-10">
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Royal Market of AraQueen 💹
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Welcome to the bustling heart of AraQueen’s economy — where Nobles and Citizens trade fortunes,
          and the Royal Treasury grows with every token moved.
        </p>

        {/* 🔹 Live Asset Prices Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 bg-white/60 border border-pink-100 rounded-2xl px-6 py-4 backdrop-blur-md shadow-inner">
          {Object.entries(prices).map(([key, val]) => (
            <div
              key={key}
              className="flex items-center gap-2 text-gray-700 font-medium text-sm bg-white/50 rounded-full px-4 py-2 shadow-sm hover:scale-105 transition-transform"
            >
              <img src={`/${key.toLowerCase()}.png`} alt={key} className="w-5 h-5" />
              <span>{key}</span>
              <span className="font-semibold text-pink-500">
                {val > 1 ? `$${val.toFixed(2)}` : val.toFixed(5)}
              </span>
            </div>
          ))}
        </div>

        {/* 🔸 Royal Treasury */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/60 backdrop-blur-md border border-pink-200 rounded-2xl shadow-lg py-5 px-10 mb-12 inline-block"
        >
          <h3 className="text-xl font-bold mb-2 text-pink-600">Royal Treasury Balance 💰</h3>
          <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500">
            ${treasury.toLocaleString()} USD
          </p>
          <p className="text-xs text-gray-500 mt-1">Total accumulated from Pump.fun & Boop.fun</p>
        </motion.div>

        {/* Price Alert */}
        <AnimatePresence>
          {priceAlert && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg"
            >
              <span>⚡</span> {priceAlert}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔸 Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Pump.fun Chart */}
<div className="bg-white/70 backdrop-blur-sm border border-pink-200 rounded-2xl shadow-lg p-6 relative overflow-hidden">
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-yellow-300 opacity-30 rounded-full blur-2xl"></div>

  {/* Header + Button */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <img src="/pumpfun.png" alt="Pump.fun" className="w-6 h-6" />
      <h3 className="text-lg font-semibold text-pink-600">Pump.fun Market</h3>
    </div>
    <a
      href="https://pump.fun/coin/araq"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
    >
      Buy $AraQ
    </a>
  </div>

  {/* Chart */}
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={pumpData}>
      <XAxis dataKey="time" hide />
      <YAxis hide />
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "8px",
          border: "1px solid #fbcfe8",
        }}
      />
      <Line type="monotone" dataKey="price" stroke="#ec4899" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>

  <p className="text-sm text-gray-600 mt-3">Live price data from Pump.fun (coming soon).</p>
</div>

{/* Boop.fun Chart */}
<div className="bg-white/70 backdrop-blur-sm border border-yellow-200 rounded-2xl shadow-lg p-6 relative overflow-hidden">
  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-pink-400 opacity-30 rounded-full blur-2xl"></div>

  {/* Header + Button */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <img src="/boopfun.png" alt="Boop.fun" className="w-6 h-6" />
      <h3 className="text-lg font-semibold text-yellow-600">Boop.fun Market</h3>
    </div>
    <a
      href="https://boop.fun/coin/araq"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
    >
      Buy $AraQ
    </a>
  </div>

  {/* Chart */}
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={boopData}>
      <XAxis dataKey="time" hide />
      <YAxis hide />
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "8px",
          border: "1px solid #fde68a",
        }}
      />
      <Line type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>

  <p className="text-sm text-gray-600 mt-3">Live price data from Boop.fun (coming soon).</p>
</div>
</div>

        {/* Divider */}
        <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 italic">“The market is the heartbeat of the kingdom.” 👑</p>
      </div>
    </section>
  );
}
