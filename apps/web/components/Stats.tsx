import { Stats } from "@/types/profile";
import { Badges } from "./Badges";
import { FavTopics } from "./FavTopics";
import { RecentBlogs } from "./RecentBlogs";

export const StatsSection = ({ props }: { props: Stats }) => {
  return (
    <div className="flex pt-5 ">
      <div className="flex flex-col gap-3 w-3/4">
        <FavTopics props={props.favTopics} />
        <RecentBlogs props={props.RecentPosts} />
      </div>
      <Badges props={props.badges} />
    </div>
  );
};
