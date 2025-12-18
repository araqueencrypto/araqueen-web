import { useEffect, useRef, useState } from "react";

export default function RunningText() {
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      if (!firstItemRef.current) return;
      const w = Math.ceil(firstItemRef.current.getBoundingClientRect().width);
      setDistance(w);
    }

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

  const speedPxPerSec = 80;
  const durationSec = distance > 0 ? distance / speedPxPerSec : 10;

  return (
    <div className="relative w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 text-white py-3 overflow-hidden shadow-md">
      
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>

      <div
        className="marquee-viewport relative z-10"
        style={{
          ["--distance"]: `${distance}px`,
          ["--duration"]: `${durationSec}s`,
        }}
        ref={trackRef}
      >
        <div className="marquee-track">
          
          {/* ITEM 1 */}
          <div className="marquee-item" ref={firstItemRef} aria-hidden="false">
            <div className="flex items-center gap-3 px-6 whitespace-nowrap">
              <span>🔥 AraQueen LIVE NOW on</span>
              <span className="flex items-center gap-2">
                <img src="/pumpfun.png" alt="Pump.fun" className="w-5 h-5 object-contain" />
                <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Pump.fun
                </a>
              </span>
              <span>🚀 Join the Kingdom & Earn Your Royal Rewards! 👑</span>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="marquee-item" aria-hidden="true">
            <div className="flex items-center gap-3 px-6 whitespace-nowrap">
              <span>🔥 AraQueen LIVE NOW on</span>
              <span className="flex items-center gap-2">
                <img src="/pumpfun.png" alt="Pump.fun" className="w-5 h-5 object-contain" />
                <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Pump.fun
                </a>
              </span>
              <span>🚀 Join the Kingdom & Earn Your Royal Rewards! 👑</span>
            </div>
          </div>

        </div>
      </div>

      {/* FIX: remove jsx attribute */}
      <style>{`
        .marquee-viewport {
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          gap: 0;
          animation: marquee-linear var(--duration) linear infinite;
          will-change: transform;
        }

        .marquee-item {
          flex: 0 0 auto;
        }

        @keyframes marquee-linear {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--distance))); }
        }

        @media (max-width: 640px) {
          .marquee-item span { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}
