import Image from "next/image"

const Page = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="w-screen h-28">
				<Image
					height={1000}
					width={1000}
					src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/2364b7176857561.65c0d93ec9440.png"
					alt="Banner Image"
					className="w-full h-72 object-cover "

				/>
			</div>
		</div>
	)
}
export default Page
