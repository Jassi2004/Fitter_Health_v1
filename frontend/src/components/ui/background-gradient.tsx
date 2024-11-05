// ui/background-gradient.tsx
"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gradient-to-b from-gray-900 via-gray-900 dark:border-white/[0.2]  rounded-full w-full h-full  ", // Reduced padding to p-1
        className
      )}
    >
      <div className="absolute -inset-px bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-full opacity-0 group-hover/card:opacity-100 blur transition duration-1000 group-hover:duration-200" />
      <div className="relative">{children}</div>
    </div>
  );
};
