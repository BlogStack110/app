import { Profile } from "@/types/profile"
import { GithubIcon, TwitchIcon, TwitterIcon, Verified } from "lucide-react"
import Image from "next/image"


export const ProfileCard = ({ props }: { props: Profile }) => {
	return (
		<div className="flex flex-col mx-auto h-fit min-w-7xl -translate-y-1/2 w-full">
			<div className="flex flex-col bg-gradient-to-r from-neutral-800/90 to-neutral-900/95 rounded-lg shadow-md p-4 h-56 backdrop-blur-lg">
				<div className="flex justify-between">

					{/* Left top section*/}
					<div className="flex items-center gap-4">
						{/* Profile Image */}
						<div className="">
							<div className="w-20 h-20 rounded-lg overflow-hidden">
								<Image
									height={1000}
									width={1000}
									src={"https://avatarfiles.alphacoders.com/377/thumb-350-377434.webp"}
									alt="Profile Image"
								/>
							</div>
							<span>
								<Verified className="h-5 w-5 fill-blue-500 -translate-y-[100%] -translate-x-1/4 " />
							</span>
						</div>
						{/* Profile Name and Handle */}
						<div className="flex flex-col justify-center space-y-1 -translate-y-3">
							<h3 className="text-xl font-bold text-white">
								{"Roronoa Zoro"}
							</h3>
							<div className="flex items-center gap-2">
								<span className="text-xs bg-neutral-700/40 text-neutral-200 rounded-md p-1 px-2">
									{"69k Followers"}
								</span>
								<span className="text-neutral-500 bg-neutral-700/40 rounded-md p-1 px-2">
									<TwitterIcon className="h-4 w-4 fill-neutral-500" />
								</span>
								<span className="text-neutral-500 bg-neutral-700/40 rounded-md p-1 px-2">

									<GithubIcon className="h-4 w-4 fill-neutral-500" />
								</span>
								<span className="text-neutral-500 bg-neutral-700/40 rounded-md p-1 px-2">
									<TwitchIcon className="h-4 w-4 " />
								</span>
							</div>
						</div>

					</div>
					<div>
					</div>
				</div>

			</div>
		</div>
	)
}
