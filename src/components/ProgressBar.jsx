import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(500000);
  const [displayed, setDisplayed] = useState(0);
  const prevReward = useRef(0);
  const controls = useAnimation();

  // 🔹 Fetch Data (Mock API, nanti ganti ke API Pump.fun)
  const fetchReward = async () => {
    try {
      const response = await fetch("/mock-reward.json");
      const data = await response.json();

      const currentReward = data.reward;
      const goalReward = data.target;

      setGoal(goalReward);
      const percentage = Math.min((currentReward / goalReward) * 100, 100);

      // Update progress
      setProgress(percentage);

      // Animasi angka halus
      animateValue(prevReward.current, currentReward, 800);
      prevReward.current = currentReward;
    } catch (error) {
      console.error("⚠️ Gagal memuat data reward:", error);
    }
  };

  // 🔹 Animasi angka naik
  const animateValue = (start, end, duration) => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      setDisplayed(value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // 🔹 Efek idle lembut
  useEffect(() => {
    const pulseEffect = async () => {
      while (true) {
        await controls.start({
          opacity: [1, 0.95, 1],
          transition: { duration: 2.2, ease: "easeInOut" },
        });
      }
    };
    pulseEffect();
  }, [controls]);

  // 🔹 Fetch berkala
  useEffect(() => {
    fetchReward();
    const interval = setInterval(fetchReward, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Bar Utama */}
      <div className="relative w-full max-w-md bg-white/40 rounded-full h-6 overflow-hidden border border-pink-200 shadow backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300"
          animate={controls}
          style={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Overlay Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

        {/* Angka */}
        <span className="absolute inset-0 flex justify-center items-center text-[12px] font-semibold text-gray-800 select-none">
          {displayed.toLocaleString()} / {goal.toLocaleString()} USD
        </span>
      </div>

      {/* 🔹 Teks di bawah progress bar */}
      <p className="mt-2 text-sm md:text-base text-pink-700 font-medium">
        Reward collected to build the kingdom:{" "}
        <span className="text-pink-600 font-bold">
          {progress.toFixed(1)}%
        </span>
      </p>
    </div>
  );
}
