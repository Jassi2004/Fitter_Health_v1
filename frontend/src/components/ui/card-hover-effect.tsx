"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    isFollowing: boolean;
    followId: string;
    handleFollow: () => void;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col py-10 space-y-4", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-blue-600/[0.3] block rounded-3xl" // Changed to blue background on hover
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center justify-between h-full">
              <img
                src="path_to_profile_picture" // Replace with actual profile picture URL
                alt={item.title}
                className="h-16 w-16 rounded-full mr-4"
              />
              <div className="flex-grow">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
              <FollowButton
                isFollowing={item.isFollowing}
                followId={item.followId}
                handleFollow={item.handleFollow}
              />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl h-20 min-w-[300px] p-4 overflow-hidden border border-blue-600 group-hover:border-blue-500 transition-all duration-200 relative z-20", // Changed border colors to blue
        className
      )}
    >
      <div className="relative z-50 w-full">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-blue-300 tracking-wide leading-relaxed text-sm", 
        className
      )}
    >
      {children}
    </p>
  );
};

const FollowButton = ({
    isFollowing,
    followId,
    handleFollow,
  }: {
    isFollowing: boolean;
    followId: string;
    handleFollow: () => void;
  }) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFollow();
        }}
        className={`ml-4 px-4 py-2 rounded-lg text-white border-2 ${
          isFollowing ? "bg-gray-800 border-gray-600 hover:bg-gray-700" : "bg-blue-800 border-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    );
  };
  