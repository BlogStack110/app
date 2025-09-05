"use client";
import { Stats } from "@/types/profile";
import { motion } from "motion/react";
import { useState } from "react";
export const ProfileStats = (props: Stats) => {
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
      className="flex flex-col justify-center items-center h-full min-w-7xl max-w-[1280px] z-50 w-full"
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
    </motion.div>
  );
};
