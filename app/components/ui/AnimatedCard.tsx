"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function AnimatedCard({ children }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}