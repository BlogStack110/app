import { FacebookIcon, GithubIcon, LinkedinIcon, MessageSquare, MoreHorizontal, TwitchIcon, TwitterIcon, Verified, Youtube } from "lucide-react"
import Image from "next/image"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { Profile } from "@/types/profile";

const SocialIcon = ({ link }: { link: string }) => {

	const name = link.includes("github") ? "github" : link.includes("twitter") ?
		"twitter" : link.includes("twitch") ? "twitch" : link.includes("linkedin") ? "linkedin" : link.includes("youtube") ? "youtube" : link.includes("facebook") ? "facebook" : "";

	switch (name) {
		case "github":
			return <GithubIcon className="h-4 w-4 fill-neutral-500" />
		case "twitter":
			return <TwitterIcon className="h-4 w-4 fill-neutral-500" />
		case "twitch":
			return <TwitchIcon className="h-4 w-4" />
		case "linkedin":
			return <LinkedinIcon className="h-4 w-4 fill-neutral-500" />
		case "youtube":
			return <Youtube className="h-4 w-4 fill-neutral-500" />
		case "facebook":
			return <FacebookIcon className="h-4 w-4 fill-neutral-500" />
		default:
			return null;
	}
}


export const ProfileCard = ({ props }: { props: Profile }) => {
	return (
		<div className="flex flex-col mx-auto h-fit min-w-7xl max-w-[1280px] -translate-y-[60%] w-full">
			<div className="flex flex-col bg-gradient-to-r from-neutral-800/90 to-neutral-900/95 rounded-lg shadow-md p-4 h-56 backdrop-blur-lg">
				{/* Top section */}
				<div className="flex justify-between">

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
								<Verified strokeWidth={1} className="h-5 w-5 fill-blue-500 -translate-y-[75%] -translate-x-1/4 " />
							</span>
						</div>
						{/* Profile Name and Handle */}
						<div className="flex flex-col justify-center space-y-1 -translate-y-3">
							<h3 className="text-xl font-bold text-white">
								{props.fullName}
							</h3>
							<div className="flex items-center gap-2">
								<span className="text-xs font-semibold bg-neutral-700/65 text-neutral-200 rounded-md p-1 px-2">
									{props.followers > 1000 ? `${(props.followers / 1000).toFixed(0)}K` : props.followers} Followers
								</span>
								{

									props.socialLinks.map((link, index) => (
										<span key={index} className="text-neutral-500 bg-neutral-700/65 rounded-md p-1 px-2 cursor-pointer">
											<SocialIcon link={link} />
										</span>
									)
									)
								}


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
					<div className="flex flex-col col-span-1 space-y-1 ">
						<h4 className="text-xl text-neutral-300 font-semibold">About</h4>
						<div className="text-md text-neutral-500">
							{props.about.length > 125 ? props.about.slice(0, 125) + "..." : props.about}

							<Drawer>
								<DrawerTrigger asChild>

									<span className="font-semibold text-blue-400 cursor-pointer">Read More</span>
								</DrawerTrigger>
								<DrawerContent className="border-none rounded-tl-3xl rounded-tr-3xl">
									<div className="mx-auto w-full flex flex-col justify-between space-y-3 max-w-[1280px] ">
										<DrawerHeader>
											<DrawerTitle className="text-neutral-400">{"About " + props.fullName}</DrawerTitle>
										</DrawerHeader>
										<div className=" pb-0">
											<div className="flex text-lg font-semibold text-neutral-400 self-center">
												{props.about}
											</div>
										</div>
										<DrawerFooter>
											<DrawerClose asChild>
												<Button className="w-[200px] self-center" variant="outline">Back</Button>
											</DrawerClose>
										</DrawerFooter>
									</div>
								</DrawerContent>
							</Drawer>
						</div>
					</div>
					{/* Right bottom section */}
					<div className="flex col-span-1 justify-end items-end space-x-2">
						<div className="text-md font-semibold bg-neutral-900 text-neutral-500 size-fit p-1 px-2 rounded-md inset-shadow-neutral-950">
							Developer
						</div>
						<div className="text-md font-semibold bg-neutral-900 text-neutral-500 size-fit p-1 px-2 rounded-md inset-shadow-neutral-950">
							Contributor
						</div>
						<div className="text-md font-semibold bg-neutral-900 text-neutral-500 size-fit p-1 px-2 rounded-md inset-shadow-neutral-950">
							Admin
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
