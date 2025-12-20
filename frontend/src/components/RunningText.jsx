import { useEffect, useRef, useState } from "react";

export default function RunningText() {
  const firstItemRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      if (!firstItemRef.current) return;
      setDistance(firstItemRef.current.getBoundingClientRect().width);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const speed = 70;
  const duration = distance ? distance / speed : 12;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#1a0028] via-[#2b0040] to-[#1a0028] text-white py-3 border-b border-white/10">
      
      <div
        className="relative"
        style={{
          ["--distance"]: `${distance}px`,
          ["--duration"]: `${duration}s`,
        }}
      >
        <div className="flex marquee-track">
          {/* ITEM 1 */}
          <div ref={firstItemRef} className="flex items-center gap-4 px-8 whitespace-nowrap">
            <span className="text-sm tracking-wide">
              ✨ AraQueen is a community where shared happiness becomes real-world value —
              for people and the planet.
            </span>
          </div>

          {/* ITEM 2 (CLONE) */}
          <div className="flex items-center gap-4 px-8 whitespace-nowrap">
            <span className="text-sm tracking-wide">
              ✨ AraQueen is a community where shared happiness becomes real-world value
              for people and the planet - Live Now on Pump.fun
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee var(--duration) linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--distance))); }
        }
      `}</style>
    </div>
  );
}
