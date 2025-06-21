import RichTextEditor from "@/components/RichTextEditor";
import { ArrowLeft, Type } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white p-6">
			<div className="">
				{/* Header */}
				<div className="mb-8">
					<Link
						href="/dashboard"
						className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-4"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Dashboard
					</Link>
					<h1 className="text-3xl font-bold">Create New Blog</h1>
					<p className="text-white/60 mt-2">
						Share your thoughts and knowledge with the community
					</p>
				</div>



				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Form Section */}
					<div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
						<Form method="POST" className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-white/80 mb-2">
									Blog Title
								</label>
								<div className="relative">
									<Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
									<input
										type="text"
										name="title"
										value={""}
										onChange={(e) => setTitle(e.target.value)}
										placeholder="Building a Modern Web Application with Remix and Prisma"
										className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${actionData?.errors?.title
											? "border-red-500/50"
											: "border-white/10"
											} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 text-white placeholder:text-white/40 transition-all`}
									/>
								</div>
								{/* {actionData?.errors?.title && ( */}
								{/* 	<p className="mt-1 text-red-500 text-sm"> */}
								{/* 		{actionData.errors.title} */}
								{/* 	</p> */}
								{/* )} */}
							</div>

							<div>
								<label className="block text-sm font-medium text-white/80 mb-2">
									Content
								</label>
								<div
									className={`${actionData?.errors?.content
										? "border border-red-500/50 rounded-xl"
										: ""
										}`}
								>
									<RichTextEditor
										onChange={() => { }}
										initialContent={""}
									/>
								</div>
								<input type="hidden" name="content" value={content} />
								{actionData?.errors?.content && (
									<p className="mt-1 text-red-500 text-sm">
										{actionData.errors.content}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-white/80 mb-2">
									Tags
								</label>
								<div className="relative">
									<Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
									<input
										type="text"
										name="tags"
										value={tags}
										onChange={(e) => setTags(e.target.value)}
										placeholder="Web Development, Remix, Prisma, TypeScript, Full Stack, Tutorial"
										className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${actionData?.errors?.tags
											? "border-red-500/50"
											: "border-white/10"
											} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 text-white placeholder:text-white/40 transition-all`}
									/>
								</div>
								<p className="text-sm text-white/40 mt-1">
									Separate tags with commas
								</p>
								{actionData?.errors?.tags && (
									<p className="mt-1 text-red-500 text-sm">
										{actionData.errors.tags}
									</p>
								)}
							</div>

							<input type="hidden" name="imgUrl" value={url} />

							<button
								type="submit"
								className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
							>
								Publish Blog
							</button>
						</Form>
					</div>

					{/* Image Upload Section */}
					<div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-semibold mb-2">Featured Image</h2>
								<p className="text-white/60">
									Upload a high-quality image to make your blog stand out
								</p>
							</div>

							<div className="relative">
								{url ? (
									<div className="relative group">
										<img
											src={url}
											alt="Preview"
											className="w-full h-64 object-cover rounded-xl"
										/>
										<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
											<button
												onClick={() => setUrl("")}
												className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
												type="button"
											>
												Remove Image
											</button>
										</div>
									</div>
								) : (
									<div className="border-2 border-dashed border-white/10 rounded-xl p-8">
										<UploadDropzo
											className="bg-transparent ut-button:bg-blue-500 ut-button:text-white ut-button:hover:bg-blue-600 ut-button:rounded-xl ut-button:px-6 ut-button:py-3 ut-button:font-medium ut-button:transition-colors"
											endpoint="imageUploader"
											onClientUploadComplete={(res) => {
												console.log("Files: ", res[0].url);
												setUrl(res[0].url);
											}}
											onUploadError={(error: Error) => {
												console.error("Upload error:", error);
											}}
											onUploadBegin={(name) => {
												console.log("Uploading: ", name);
											}}
										/>
									</div>
								)}
							</div>

							<div className="bg-white/5 rounded-xl p-6">
								<h3 className="font-medium mb-2">Tips for a great blog post</h3>
								<ul className="space-y-2 text-white/60 text-sm">
									<li>• Write a compelling and clear title</li>
									<li>• Structure your content with proper headings</li>
									<li>• Include relevant images and media</li>
									<li>• Use appropriate tags for better discoverability</li>
									<li>• Proofread your content before publishing</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
