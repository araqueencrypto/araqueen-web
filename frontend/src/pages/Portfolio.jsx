import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

//const backendBaseUrl = "http://localhost:8080";
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Portfolio() {
  const { connected, publicKey } = useWallet();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "AraQueen Portfolio";
    if (!connected || !publicKey) {
      setPortfolio(null);
      setLoading(false);
      return;
    }

    // Ambil data user dari backend
    fetch(`${backendBaseUrl}/api/user/${publicKey.toBase58()}`)
      .then((res) => res.json())
      .then((data) => setPortfolio(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [connected, publicKey]);

  if (!connected)
    return (
      <div className="text-center py-10 text-gray-500">
        Connect your wallet to view your portfolio.
      </div>
    );

  if (loading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 animate-pulse">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-48"></div>
        ))}
      </div>
    );

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-pink-600">💼 My Portfolio</h2>
      {portfolio && (
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <p><strong>Wallet:</strong> {portfolio.wallet}</p>
          <p><strong>Rank:</strong> {portfolio.rank}</p>
          <p><strong>Tokens:</strong> {portfolio.tokens} SOL</p>
          <p><strong>NFTs Owned:</strong> {portfolio.nfts}</p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-pink-600 mb-2">My NFTs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: portfolio?.nfts || 0 }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white border rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-pink-100 to-yellow-100 h-36 flex items-center justify-center text-pink-500 font-semibold">
                NFT #{i + 1}
              </div>
              <p className="text-center text-xs py-2 text-gray-600">AraQueen NFT</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
