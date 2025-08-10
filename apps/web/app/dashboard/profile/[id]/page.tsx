import { getProfileDetails } from "@/app/actions/profile"
import { ProfileCard } from "@/components/ProfileCard"
import { Profile } from "@/types/profile";
import Image from "next/image"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const profile: Profile = await getProfileDetails(id)
	return (
		<div className="flex flex-col min-w-7xl max-w-8xl items-center">
			<div className="w-full flex justify-center">
				<Image
					height={1000}
					width={1000}
					src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/2364b7176857561.65c0d93ec9440.png"
					alt="Banner Image"
					className="w-full h-80 object-cover "

				/>
			</div>
			<div className="flex flex-col transii items-center mt-4">
				<ProfileCard props={profile} />
			</div>
			<div className="flex flex-col items-center fixed bottom-[50%] bg-green-600 h-fit w-7xl">

			</div>
		</div>
	)
}
