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
        "relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto rounded-xl p-6 border border-solid", // Added `border-solid`
        className
      )}
    >
      <div className="absolute -inset-px bg-gradient-to-r rounded-xl opacity-0 group-hover/card:opacity-100 blur transition duration-1000 group-hover:duration-200" />
      <div className="relative">{children}</div>
    </div>
  );
};
