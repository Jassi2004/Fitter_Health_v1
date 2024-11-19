import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

interface Post {
  _id: string;
  author: string;
  title: string;
  content: string;
  images: string[];
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  comments: { username: string; comment: string }[];
  likes?: number;
}

interface PostSectionProps {
  posts: Post[];
  username: string;
  API_BASE_URL: string;
}

const ExpandableCardDemo: React.FC<PostSectionProps> = ({ posts, username, API_BASE_URL }) => {
  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4   p-4">
      <AnimatePresence>
        {posts.map((post) => (
          <ExpandableCard
            key={post._id}
            post={post}
            onClick={() => {}}
            username={username}
            API_BASE_URL={API_BASE_URL}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableCardDemo;