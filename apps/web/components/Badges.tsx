import { Stats } from "@/types/profile";
import { LucideStar } from "lucide-react";
import Image from "next/image";

export const Badges = ({ props }: { props: Stats["badges"] }) => {
  return (
    <div className="flex flex-col gap-3 pl-6 w-1/4">
      <div className="flex items-center ">
        <div className="size-fit rounded-md mr-2 p-2 bg-neutral-800 ">
          <LucideStar className="size-5 fill-neutral-600/60 text-neutral-600" />
        </div>
        <h3 className=" font-bold text-xl text-neutral-400 ">Badges</h3>
      </div>
      <div className="flex flex-col gap-2 bg-neutral-900 p-5 rounded-lg mt-2 w-full">
        {props.map((badge, index) => (
          <div key={index} className="flex justify-start gap-5 items-center">
            <Image
              src={badge.png}
              alt={badge.name}
              width={100}
              height={100}
              className="size-15"
            />
            <div className="flex flex-col justify-start">
              <h3 className="text-neutral-400 text-lg font-semibold">
                {badge.name}
              </h3>
              <p className="text-neutral-400/65 text-md">{badge.issued}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
