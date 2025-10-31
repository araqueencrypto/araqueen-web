import { useEffect, useRef, useState } from "react";

export default function RunningText() {
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);
  const [distance, setDistance] = useState(0);

  // ukur lebar konten pertama setelah gambar/font load
  useEffect(() => {
    function measure() {
      if (!firstItemRef.current) return;
      // lebar konten pertama (inkl. margin kiri/kanan)
      const w = Math.ceil(firstItemRef.current.getBoundingClientRect().width);
      setDistance(w);
    }

    // ukur setelah sedikit delay dan juga pada resize
    measure();
    const ro = new ResizeObserver(measure);
    if (firstItemRef.current) ro.observe(firstItemRef.current);
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    return () => {
      if (firstItemRef.current) ro.unobserve(firstItemRef.current);
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // kecepatan default: 80 px per second (bisa diubah)
  const speedPxPerSec = 80;
  const durationSec = distance > 0 ? (distance / speedPxPerSec) : 10;

  return (
    <div className="relative w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 text-white py-3 overflow-hidden shadow-md">
      {/* Overlay glow lembut */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>

      {/* Viewport / track wrapper */}
      <div
        className="marquee-viewport relative z-10"
        style={{
          // pass variables to CSS
          ["--distance"]: `${distance}px`,
          ["--duration"]: `${durationSec}s`,
        }}
        ref={trackRef}
      >
        {/* Konten animasi (duplikat untuk looping) */}
        <div className="marquee-track">
          <div className="marquee-item" ref={firstItemRef} aria-hidden="false">
            <div className="flex items-center gap-3 px-6">
              <span>🔥 AraQueen LIVE NOW on</span>
              <span className="flex items-center gap-2">
                {/* Tetapkan ukuran gambar agar layout stabil */}
                <img src="/pumpfun.png" alt="Pump.fun" className="w-5 h-5 object-contain" />
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Pump.fun
                </a>
              </span>
              <span>🚀 Join the Kingdom & Earn Your Royal Rewards! 👑</span>
            </div>
          </div>

          {/* Duplikat: buat looping mulus */}
          <div className="marquee-item" aria-hidden="true">
            <div className="flex items-center gap-3 px-6">
              <span>🔥 AraQueen LIVE NOW on</span>
              <span className="flex items-center gap-2">
                <img src="/pumpfun.png" alt="Pump.fun" className="w-5 h-5 object-contain" />
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Pump.fun
                </a>
              </span>
              <span>🚀 Join the Kingdom & Earn Your Royal Rewards! 👑</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-viewport {
          overflow: hidden;
        }

        /* track berisi 2x konten (side-by-side) */
        .marquee-track {
          display: flex;
          align-items: center;
          /* jangan biarkan flex shrink/mengisi; kita ingin konten inline dan ukurannya tetap */
          gap: 0;
          /* animate menggunakan variabel --distance dan --duration */
          animation: marquee-linear var(--duration) linear infinite;
          will-change: transform;
        }

        .marquee-item {
          flex: 0 0 auto; /* penting: setiap blok tidak mengecil */
          display: flex;
          align-items: center;
        }

        /* pastikan ada sedikit padding horizontal pada konten, bukan margin besar */
        .marquee-item > div {
          white-space: nowrap;
        }

        @keyframes marquee-linear {
          0% {
            transform: translateX(0);
          }
          100% {
            /* geser tepat sebanyak lebar item pertama sehingga duplikat mengisi */
            transform: translateX(calc(-1 * var(--distance)));
          }
        }

        /* fallback / kecilkan font di mobile jika perlu */
        @media (max-width: 640px) {
          .marquee-item span { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}
