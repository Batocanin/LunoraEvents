"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeartProps {
  size: number;
  x: string;
  delay: number;
  color?: string;
}

const Heart: React.FC<HeartProps> = ({ size, x, delay, color = "red" }) => (
  <motion.div
    className="absolute"
    initial={{ y: "100%", x, opacity: 0 }}
    animate={{ y: "-100%", opacity: [0, 1, 0] }}
    transition={{ duration: 4, delay, ease: "easeOut" }}
    style={{ fontSize: size, color }}
  >
    ❤️
  </motion.div>
);

interface HeartData {
  id: number;
  size: number;
  x: string;
  delay: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(
        (prevHearts) =>
          [
            ...prevHearts,
            {
              id: Date.now(),
              size: Math.random() * 20 + 10,
              x: Math.random() * 100 + "%",
              delay: Math.random() * 2,
            },
          ].slice(-20) // zadržava poslednjih 20 srdaca
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-5 right-20 pointer-events-none z-[999]">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  );
};
