import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//const backendBaseUrl = "http://localhost:8080";
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "AraQueen NFT Auction";
    // Contoh dummy data, nanti bisa dari backend: /api/auctions
    setTimeout(() => {
      setAuctions([
        { id: 1, name: "Royal Cat #01", image: "/nfts/dummy-cat.jpg", bid: 0.12, time: 90 },
        { id: 2, name: "Golden Queen #77", image: "/nfts/dummy-cat.jpg", bid: 0.45, time: 45 },
        { id: 3, name: "Mystic Pearl #13", image: "/nfts/dummy-cat.jpg", bid: 0.20, time: 150 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-pink-600">⚔️ NFT Auctions (Lelang)</h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-48"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {auctions.map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white border rounded-2xl shadow-sm overflow-hidden"
            >
              <img
                src={a.image.startsWith("http") ? a.image : `${backendBaseUrl}${a.image}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-sm">
                <h3 className="font-semibold text-gray-800 truncate">{a.name}</h3>
                <p className="text-pink-600 text-xs font-semibold mt-1">
                  Current Bid: {a.bid} SOL
                </p>
                <p className="text-xs text-gray-500">
                  Ends in: {Math.floor(a.time / 60)}m {a.time % 60}s
                </p>
                <button
                  onClick={() => alert("Join Bid for " + a.name)}
                  className="mt-2 w-full py-1.5 text-xs bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full"
                >
                  Place Bid
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
