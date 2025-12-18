import { motion } from "framer-motion";
import BuyWithAraQButton from "./AraQueenNFT_BuyWithAraQ_Component";

export default function NFTSection() {
  const nfts = [
    {
      id: 1,
      name: "This NFT is being created #001",
      price: "2.4 SOL",
      image: "/nfts/nft-1.jpg",
      link: "https://magiceden.io/item-details/royalcat001",
    },
    {
      id: 2,
      name: "This NFT is being created #017",
      price: "3.8 SOL",
      image: "/nfts/nft-2.jpg",
      link: "https://magiceden.io/item-details/goldenthrone017",
    },
    {
      id: 3,
      name: "This NFT is being created #088",
      price: "1.9 SOL",
      image: "/nfts/nft-3.jpg",
      link: "https://magiceden.io/item-details/crownspirit088",
    },
    {
      id: 4,
      name: "This NFT is being created #102",
      price: "4.2 SOL",
      image: "/nfts/nft-4.jpg",
      link: "https://magiceden.io/item-details/araqueenjewel102",
    },
    {
      id: 5,
      name: "This NFT is being created #225",
      price: "2.7 SOL",
      image: "/nfts/nft-5.jpg",
      link: "https://magiceden.io/item-details/ancientseal225",
    },
    {
      id: 6,
      name: "This NFT is being created #310",
      price: "3.1 SOL",
      image: "/nfts/nft-6.jpg",
      link: "https://magiceden.io/item-details/royalflame310",
    },
  ];

  return (
    <section
      id="nfts"
      className="py-20 bg-gradient-to-b from-pink-50 via-white to-yellow-50 text-center relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-transparent to-yellow-200/30 blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400 drop-shadow-sm">
          The Royal NFT Gallery
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore the exclusive digital crown collection from the AraQueen Kingdom — 
          where every NFT holds a royal story and timeless beauty.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {[
            ["👑 Total Supply", "-"],
            ["💎 Owners", "-"],
            ["💰 Floor Price", "-SOL"],
            ["🔥 Volume Traded", "-SOL"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="bg-white/70 border border-pink-100 rounded-2xl px-6 py-4 backdrop-blur-md shadow-inner hover:scale-105 transition-transform"
            >
              <p className="text-gray-600 text-sm">{title}</p>
              <p className="text-pink-600 text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {nfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 border border-pink-200 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm hover:shadow-pink-200/50 transition-all flex flex-col items-center"
            >
              {/* Gambar NFT */}
              <div className="relative w-full">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Informasi NFT */}
              <div className="p-5 flex flex-col items-center w-full">
                <h3 className="font-semibold text-pink-600 text-lg">{nft.name}</h3>
                <p className="text-gray-500 text-sm mb-4">Price: {nft.price}</p>

                {/* Tombol View dan Buy */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <a
                    href={nft.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full shadow-md hover:scale-105 transition-transform"
                  >
                    View on Marketplace
                  </a>

                  {/* Integrasi Buy with $AraQ */}
                  <BuyWithAraQButton />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="https://magiceden.io/collection/araqueen"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-14 px-10 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold rounded-full shadow-lg transition-transform"
        >
          Explore Full Collection
        </motion.a>
      </div>
    </section>
  );
}
