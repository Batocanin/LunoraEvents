"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BubbleProps {
  size: number;
  x: string;
  delay: number;
}

const Bubble: React.FC<BubbleProps> = ({ size, x, delay }) => (
  <motion.div
    className="absolute rounded-full bg-blue-200 opacity-70"
    initial={{ y: "100%", x, opacity: 0 }}
    animate={{ y: "-100%", opacity: [0, 0.7, 0] }}
    transition={{ duration: 4, delay, ease: "easeOut" }}
    style={{ width: size, height: size }}
  />
);

interface BubbleData {
  id: number;
  size: number;
  x: string;
  delay: number;
}

export const FloatingBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prevBubbles) =>
        [
          ...prevBubbles,
          {
            id: Date.now(),
            size: Math.random() * 30 + 10,
            x: Math.random() * 100 + "%",
            delay: Math.random() * 2,
          },
        ].slice(-20)
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-20 top-5 pointer-events-none z-[999]">
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} />
      ))}
    </div>
  );
};
