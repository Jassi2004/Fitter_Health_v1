import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Heart, MessageCircle } from "lucide-react";
import { likePost } from "@/services/post/likeComment";

interface ExpandableCardProps {
  post: {
    _id: string;
    author: string;
    title: string;
    content: string;
    images: string[];
    description: string;
    ctaText: string;
    ctaLink: string;
    comments: { username: string; comment: string }[];
    likes?: number;
  };
  onClick: () => void;
  username: string;
  API_BASE_URL: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({ post, username, API_BASE_URL }) => {
  const [active, setActive] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false); // New state to track like status
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(false));

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const updatedPost = await likePost(post._id, userId);
      setLikes(updatedPost.likes); 
      setIsLiked(!isLiked); // Toggle like state
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full m-4 z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 p-4 grid place-items-center z-[100]">
            <motion.button
              key={`button-${post.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(false)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${post._id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${post._id}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={API_BASE_URL + post.images[0]}
                  alt={post.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${post.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {username}
                    </motion.h3>
                  </div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={post.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {post.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {post.content}
                  </motion.div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <motion.div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={handleLike}
                >
                  <Heart size={18} color={isLiked ? "red" : "gray"} /> {/* Change color based on `isLiked` */}
                  <span>{likes}</span>
                </motion.div>
                <motion.div className="flex items-center space-x-2">
                  <MessageCircle size={18} />
                  <span>{post.comments.length}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.div
        layoutId={`card-${post._id}-${id}`}
        onClick={() => setActive(true)}
        className="p-6 flex flex-col hover:bg-neutral-50 dark:hover:bg-gray-950 rounded-xl cursor-pointer border border-neutral-200 dark:border-neutral-700 shadow-md dark:shadow-neutral-800/50"
      >
        <div className="flex gap-6 flex-col w-full">
          <motion.div layoutId={`image-${post._id}-${id}`}>
            <Image
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${post.images[0]}`}
              alt={post.title}
              className="h-72 w-full rounded-lg object-cover object-top"
            />
          </motion.div>
          <div className="flex justify-center items-center flex-col">
            <motion.h3
              layoutId={`title-${post._id}-${id}`}
              className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
            >
              {post.title}
            </motion.h3>
            <motion.p
              layoutId={`content-${post._id}-${id}`}
              className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
            >
              {post.content}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const CloseIcon = () => (
  <motion.svg
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
