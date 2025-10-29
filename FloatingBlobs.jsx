import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      <motion.div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-pink-200/30 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute top-28 right-0 w-[360px] h-[360px] bg-yellow-200/30 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
    </>
  );
}
