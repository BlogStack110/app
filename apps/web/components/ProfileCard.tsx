"use client";
import { motion } from "motion/react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  MoreHorizontal,
  TwitchIcon,
  TwitterIcon,
  Verified,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { Profile } from "@/types/profile";
import { formatDate } from "@/lib/dateFunction";
import { useState } from "react";
const SocialIcon = ({ link }: { link: string }) => {
  const name = link.includes("github")
    ? "github"
    : link.includes("twitter")
      ? "twitter"
      : link.includes("twitch")
        ? "twitch"
        : link.includes("linkedin")
          ? "linkedin"
          : link.includes("youtube")
            ? "youtube"
            : link.includes("facebook")
              ? "facebook"
              : "";

  switch (name) {
    case "github":
      return <GithubIcon className="h-4 w-4 fill-neutral-500" />;
    case "twitter":
      return <TwitterIcon className="h-4 w-4 fill-neutral-500" />;
    case "twitch":
      return <TwitchIcon className="h-4 w-4" />;
    case "linkedin":
      return <LinkedinIcon className="h-4 w-4 fill-neutral-500" />;
    case "youtube":
      return <Youtube className="h-4 w-4 fill-neutral-500" />;
    case "facebook":
      return <FacebookIcon className="h-4 w-4 fill-neutral-500" />;
    default:
      return null;
  }
};

export const ProfileCard = ({ props }: { props: Profile }) => {
  const [isReadAbout, setReadAbout] = useState(false);
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
      <div className="flex flex-col bg-gradient-to-r from-neutral-900/85 to-neutral-950/85 rounded-lg w-7xl  shadow-xl p-4 pb-5 h-fit backdrop-blur-xl">
        {/* Top section */}
        <div className="flex justify-between transition-all duration-500 ease-in-out">
          {/* Left top section*/}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  height={1000}
                  width={1000}
                  src={props.imgUrl}
                  alt="Profile Image"
                />
              </div>
              <span>
                <Verified
                  strokeWidth={1}
                  className="h-5 w-5 fill-blue-500 -translate-y-[75%] -translate-x-1/4 "
                />
              </span>
            </div>
            {/* Profile Name and Handle */}
            <div className="flex flex-col justify-center space-y-1 -translate-y-3">
              <h3 className="text-xl font-bold text-white">{props.fullName}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-neutral-700/65 text-neutral-200 rounded-md p-1 px-2">
                  {props.followers > 1000
                    ? `${(props.followers / 1000).toFixed(0)}K`
                    : props.followers}{" "}
                  Followers
                </span>
                {props.socialLinks.map((link, index) => (
                  <span
                    key={index}
                    className="text-neutral-500 bg-neutral-700/65 rounded-md p-1 px-2 cursor-pointer"
                  >
                    <SocialIcon link={link} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Right top section */}
          <div className="flex justify-center space-x-2">
            <span className="text-xs bg-neutral-700/40 size-fit text-neutral-200 rounded-md p-2 cursor-pointer">
              <MoreHorizontal className="h-4 w-4 fill-neutral-500" />
            </span>
            <span className="text-xs bg-neutral-700/40 size-fit text-neutral-200 rounded-md p-2 cursor-pointer ">
              <div className="font-semibold">Message</div>
            </span>
            <span className="text-xs bg-blue-500/40 size-fit text-neutral-200 rounded-md p-2 cursor-pointer">
              <div className="font-semibold">Follow</div>
            </span>
          </div>
        </div>
        {/* Bottom section */}
        <div className="grid grid-cols-2 justify-between">
          {/* Left bottom section */}
          <div className="flex flex-col bg-gradient-to-r from-neutral-800/10 to-neutral-900/15 rounded-lg backdrop-blur-2xl col-span-1 space-y-1">
            <section className="grid place-items-center ">
              <label>
                <input
                  className="peer/showLabel absolute scale-0"
                  type="checkbox"
                />
                <span
                  onClick={() => setReadAbout(!isReadAbout)}
                  className="block max-h-14 max-w-7xl overflow-hidden rounded-lg px-4 py-0 text-neutral-600 inset-shadow-neutral-950/10 transition-all duration-300 peer-checked/showLabel:max-h-52"
                >
                  <h3 className="flex h-14 cursor-pointer items-center font-bold hover:text-blue-600/30 transition-colors duration-500 delay-75">
                    {isReadAbout
                      ? "About " + "  " + props.fullName
                      : "Read About " + "  " + props.fullName}
                  </h3>
                  <p className="mb-2 text-neutral-500 font-semibold">
                    {props.about.slice(0, 300)}
                  </p>
                </span>
              </label>
            </section>{" "}
          </div>
          {/* Right bottom section */}
          <div className="flex col-span-1  justify-end items-end space-x-2">
            <div className="text-md font-semibold text-neutral-400 size-fit hover:text-blue-500/50 transition-all duration-500 delay-100 p-1 px-2 rounded-md">
              {"Joined on " + formatDate(props.joinedDate.toString())}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
