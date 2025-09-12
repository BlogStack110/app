import { Stats } from "@/types/profile";
import { Hash, Heart } from "lucide-react";

export const FavTopics = ({ props }: { props: Stats["favTopics"] }) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center ">
        <div className="size-fit rounded-md mr-2 p-2 bg-neutral-800 ">
          <Heart className="size-5 fill-neutral-600/60 text-neutral-600" />
        </div>
        <h3 className=" font-bold text-xl text-neutral-400 ">
          Favorite Topics
        </h3>
      </div>
      <div className="grid grid-cols-6 gap-3 mt-2 w-full">
        {props.map((topic, index) => (
          <div
            className="text-sm text-neutral-500 text-center rounded-xl p-2 font-semibold bg-neutral-900"
            key={index}
          >
            <div className="flex justify-start gap-2 cursor-pointer hover:bg-blue-400/30 transition-all duration-500 delay-100 items-center p-3 rounded-lg border-[1px] border-blue-500 bg-blue-400/10">
              <Hash className="size-5 text-blue-500" />
              {topic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
