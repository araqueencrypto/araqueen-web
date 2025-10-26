export default function RunningText() {
  return (
    <div className="relative w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 text-white py-2 overflow-hidden shadow-md">
      {/* Overlay glow lembut */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Teks berjalan */}
      <div className="whitespace-nowrap animate-marquee flex items-center gap-10 text-sm font-semibold relative z-10">
        <div className="flex items-center gap-3 mx-10">
          <span>🔥 AraQueen LIVE NOW on</span>

          <span className="flex items-center gap-2">
            <img src="/pumpfun.png" alt="Pump.fun" className="w-5 h-5" />
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Pump.fun
            </a>
          </span>

          <span>&</span>

          <span className="flex items-center gap-2">
            <img src="/boopfun.png" alt="Boop.fun" className="w-5 h-5" />
            <a
              href="https://boop.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Boop.fun
            </a>
          </span>

          <span>🚀 Join the Kingdom & Earn Your Royal Rewards! 👑</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
