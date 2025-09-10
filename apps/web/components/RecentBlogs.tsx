import { Stats } from "@/types/profile";
import { ClockFading, Eye, Hash, Heart, View } from "lucide-react";

export const RecentBlogs = ({ props }: { props: Stats["RecentPosts"] }) => {
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      <div className="flex items-center">
        <div className="size-fit rounded-md mr-2 p-2 bg-neutral-800 ">
          <ClockFading className="size-5 fill-neutral-600/60 text-neutral-600" />
        </div>
        <h3 className=" font-bold text-xl text-neutral-400 ">Recent Posts</h3>
      </div>
      <div className="grid grid-cols-1 overflow-y-hidden gap-2 mt-2 w-full">
        {props?.map((blog, index) => (
          <div
            className="text-sm text-neutral-500 text-center rounded-xl p-2 font-semibold bg-neutral-900"
            key={index}
          >
            <div
              className="flex justify-between gap-2 cursor-pointer hover:bg-blue-400/30
							transition-all duration-500 delay-100 items-center  p-3 rounded-lg "
            >
              <div className="flex items-center gap-2">
                <h3 className="text-neutral-400 text-xl font-semibold">
                  {blog.title}
                </h3>
                {blog.tags.map((tag, index) => (
                  <div className="flex p-1 text-blue-500" key={index}>
                    <Hash className="size-5 text-blue-500" />
                    {tag}
                  </div>
                ))}
              </div>
              <div className=" flex text-neutral-400 text-lg gap-3">
                <div className="flex gap-1 justify-center items-center">
                  <Heart className="size-5 text-neutral-400/60 fill-red-700" />
                  {blog._count.likes}
                </div>
                <div className="flex gap-1 justify-center items-center">
                  <View className="size-5 text-neutral-400" />
                  {blog._count.views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
