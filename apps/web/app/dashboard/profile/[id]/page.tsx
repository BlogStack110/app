import { getProfileDetails, getStats } from "@/app/actions/profile";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileStats } from "@/components/profileStats";
import { Profile, Stats } from "@/types/profile";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile: Profile = await getProfileDetails(id);
  const stats: Stats = await getStats(id);
  return (
    <div className="flex justify-center  min-w-7xl items-center">
      <div className="w-full flex justify-center items-center ">
        <Image
          height={1000}
          width={1000}
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/2364b7176857561.65c0d93ec9440.png"
          alt="Banner Image"
          className="w-full h-56 object-cover "
        />
      </div>
      <div className="flex top-1/5 absolute justify-center scale-70 flex-col items-center z-50 mt-4">
        <ProfileCard props={profile} />
        <div className="h-fit absolute flex flex-col items-center top-52 z-30 ">
          <ProfileStats props={stats} />
        </div>
      </div>
    </div>
  );
}
