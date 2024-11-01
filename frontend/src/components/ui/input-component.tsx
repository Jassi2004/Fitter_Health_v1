// ui/input-component.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputComponent = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="relative">
      <motion.label
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </motion.label>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <input
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
            "transition-all duration-200 ease-in-out",
            className
          )}
          {...props}
        />
      </motion.div>
    </div>
  );
};