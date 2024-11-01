// ui/text-generate-effect.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const characters = words.split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: complete ? 0 : i * 0.1,
      }}
    >
      {char}
    </motion.span>
  ));

  return (
    <div className={cn("", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black">{characters}</div>
      </div>
    </div>
  );
};