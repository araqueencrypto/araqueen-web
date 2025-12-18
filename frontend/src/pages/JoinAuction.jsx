import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const backendBaseUrl = "http://localhost:8080";

export default function JoinAuction() {
  const { connected, publicKey } = useWallet();

  const [userNFTs, setUserNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [startPrice, setStartPrice] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Kalender minggu
  const [currentWeek, setCurrentWeek] = useState(0);
  const [displayedSlots, setDisplayedSlots] = useState([]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // === Ambil data NFT & generate slot ===
  useEffect(() => {
    document.title = "Join AraQueen Auction";

    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }

    // Dummy data NFT user
    setTimeout(() => {
      setUserNFTs([
        { id: 1, name: "Royal Cat #01", image: "/nfts/dummy-cat.jpg" },
        { id: 2, name: "Golden Queen #22", image: "/nfts/dummy-cat.jpg" },
        { id: 3, name: "Night Lotus #08", image: "/nfts/dummy-cat.jpg" },
      ]);
      setLoading(false);
    }, 700);
  }, [connected, publicKey]);

  // === Generate kalender slot mingguan ===
  useEffect(() => {
    const generateSlots = (weekOffset = 0) => {
      const start = new Date();
      start.setDate(start.getDate() + weekOffset * 7);

      const days = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateString = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        days.push({
          date: dateString,
          total: 20,
          remaining: Math.floor(Math.random() * 21), // dummy random 0–20
        });
      }
      return days;
    };

    setDisplayedSlots(generateSlots(currentWeek));
  }, [currentWeek]);

  // === Handle confirm join ===
  const handleConfirm = () => {
    alert(
      `NFT ${selectedNFT.name} akan dilelang dengan harga awal ${startPrice} SOL pada ${selectedSlot.date}.`
    );
    // TODO: POST ke backend /api/auction/join
  };

  // === Kondisi awal ===
  if (!connected)
    return (
      <div className="text-center py-10 text-gray-500">
        Connect your wallet to join an auction.
      </div>
    );

  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">Loading...</div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-pink-600 flex items-center gap-2">
        🏰 Join AraQueen Auction
      </h2>

      {/* Step Indicator */}
      <div className="flex gap-2 text-sm flex-wrap">
        {["Select NFT", "Set Price", "Choose Date", "Confirm"].map((label, i) => (
          <div
            key={i}
            className={`px-3 py-1 rounded-full border ${
              step === i + 1
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step 1 - Pilih NFT */}
      {step === 1 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Pilih NFT yang ingin kamu masukkan ke lelang.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {userNFTs.map((nft) => (
              <motion.div
                key={nft.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedNFT(nft)}
                className={`cursor-pointer border rounded-2xl p-2 shadow-sm hover:shadow-md ${
                  selectedNFT?.id === nft.id
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={nft.image}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <p className="text-center text-sm font-semibold mt-2 text-gray-700">
                  {nft.name}
                </p>
              </motion.div>
            ))}
          </div>
          <button
            disabled={!selectedNFT}
            onClick={() => setStep(2)}
            className="mt-5 w-full py-2 rounded-full bg-pink-600 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2 - Tentukan Harga */}
      {step === 2 && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Tentukan harga awal lelang untuk NFT kamu.
          </p>
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            placeholder="e.g. 0.2 SOL"
            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-300"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700"
            >
              Back
            </button>
            <button
              disabled={!startPrice || parseFloat(startPrice) <= 0}
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-full bg-pink-600 text-white disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Pilih Tanggal Kalender */}
      {step === 3 && (
        <div>
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
            <CalendarDays size={16} /> Pilih tanggal lelang (maks 20 slot per hari)
          </p>

          {/* Navigasi Minggu */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              disabled={currentWeek === 0}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
            >
              ← Sebelumnya
            </button>
            <p className="font-semibold text-gray-700">
              Minggu ke-{currentWeek + 1}
            </p>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
            >
              Berikutnya →
            </button>
          </div>

          {/* Kalender Mingguan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {displayedSlots.map((slot) => (
              <motion.div
                key={slot.date}
                whileHover={{ scale: slot.remaining > 0 ? 1.05 : 1 }}
                onClick={() => slot.remaining > 0 && setSelectedSlot(slot)}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  slot.remaining === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedSlot?.date === slot.date
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:border-pink-400"
                }`}
              >
                <p className="text-xs font-semibold text-gray-700">{slot.date}</p>
                <p className="text-[11px] mt-1">
                  Slot:{" "}
                  <span
                    className={`font-bold ${
                      slot.remaining === 0
                        ? "text-red-500"
                        : slot.remaining < 5
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {20 - slot.remaining}/20
                  </span>
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-5">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700"
            >
              Back
            </button>
            <button
              disabled={!selectedSlot}
              onClick={() => setStep(4)}
              className="px-4 py-2 rounded-full bg-pink-600 text-white disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4 - Konfirmasi */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-2xl p-5 shadow-sm"
        >
          <h3 className="text-pink-600 font-semibold mb-3">Konfirmasi Lelang</h3>
          <div className="flex items-center gap-3">
            <img
              src={selectedNFT.image}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{selectedNFT.name}</p>
              <p className="text-sm text-gray-500">
                Harga awal: {startPrice} SOL
              </p>
              <p className="text-sm text-gray-500">
                Tanggal lelang: {selectedSlot.date}
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white"
            >
              Confirm & Join Auction
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
