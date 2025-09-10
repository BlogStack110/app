"use client";
import { Stats } from "@/types/profile";
import { motion } from "motion/react";
import { useState } from "react";
import { FavTopics } from "./FavTopics";
import { RecentBlogs } from "./RecentBlogs";
import { Badges } from "./Badges";
export const ProfileStats = ({ props }: { props: Stats }) => {
  const navItems: { title: string }[] = [
    { title: "Overview" },
    { title: "Followers" },
    { title: "Following" },
    { title: "Achievements" },
  ];

  const [currentItem, setCurrentItem] = useState<string | undefined>(
    navItems[0]?.title,
  );

  return (
    <motion.div
      transition={{
        duration: 0.35,
        delay: 0,
        ease: "easeInOut",
      }}
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className=" h-full min-w-7xl max-w-[1280px] z-50 w-full"
    >
      <div className="flex bg-gradient-to-r bg-neutral-900/85 justify-start space-x-16 p-5 rounded-lg w-7xl shadow-xl backdrop-blur-xl">
        {navItems.map((item, index) => (
          <div
            onClick={() => {
              setCurrentItem(item.title);
            }}
            key={index}
            className={`text-lg ${currentItem === item.title ? "text-neutral-400 decoration-blue-500/50 underline decoration-4 underline-offset-8" : "text-neutral-500"} font-medium  cursor-pointer hover:text-neutral-400 transition-all duration-300 delay-75`}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="flex pt-5 ">
        <div className="flex flex-col gap-3 w-3/4">
          <FavTopics props={props.favTopics} />
          <RecentBlogs props={props.RecentPosts} />
        </div>
        <Badges props={props.badges} />
      </div>
    </motion.div>
  );
};
