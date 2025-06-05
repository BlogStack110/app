'use client';
import { BlogData, RelatedPosts } from '@/types/blogs';
import {
	ArrowLeft,
	Calendar,
	Eye,
	Heart,
	ImageIcon,
	MessageCircle,
	SendHorizontal,
	Share2,
	TagIcon,
	UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { pushComment } from '@/app/actions/comments';

interface BlogDetails {
	blog: BlogData | undefined;
	relatedPosts: RelatedPosts[] | undefined | null
}



const Blog = ({ blog, relatedPosts }: BlogDetails) => {
	const navigate = useRouter();
	const user = useSession().data?.user
	const [imageError, setImageError] = useState(false);
	const [comment, setComment] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const session = useSession();
	const [commentState, setCommentState] = useState<'idle' | 'submitting' | 'loading'>('idle');



	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "short",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};


	// Handle comment submission with loading state
	const handleCommentSubmit = async () => {
		if (!comment.trim()) return;
		setIsSubmitting(true);
		await pushComment(blog?.id ?? "", user?.id ?? '', comment)
		setTimeout(() => {
			setComment("");
			setIsSubmitting(false);
		}, 500);
	};

	return (
		<div className="flex-grow pb-10 md:pb-20">
			{/* Hero Section with Blog Image */}
			<div className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] relative max-w-7xl mx-auto">
				{blog?.imgUrl && !imageError ? (
					<Image
						height={1000}
						width={1000}
						src={blog.imgUrl ?? ''}
						alt={blog.title ?? ''}
						className="w-full h-full object-cover"
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
						<div className="text-center">
							<ImageIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
							<h2 className="text-xl md:text-2xl text-white/80 px-4 max-w-md mx-auto">
								{blog?.title}
							</h2>
						</div>
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 to-[#0a0a0a]"></div>
				<div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8">
					<button
						onClick={() => navigate.back()}
						className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</button>
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
						{blog?.title}
					</h1>
					<div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
						<div className="flex items-center">
							<Image
								height={1000}
								width={1000}
								src={blog?.authorImgUrl ?? 'https://dummyimage.com/40x40'}
								alt={blog?.authorId.toString() ?? ''}
								className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 mr-2 sm:mr-3"
								onError={e => {
									e.currentTarget.src = 'https://dummyimage.com/40';
								}}
							/>
							<span className="text-white/90 text-sm sm:text-base">
								{'author'}
							</span>
						</div>
						<div className="text-white/70 flex items-center text-xs sm:text-sm">
							<Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />

							<span>{formatDate(blog?.publishDate ?? new Date().toString())}</span>
						</div>
						<div className="text-white/70 flex items-center text-xs sm:text-sm">
							<Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
							<span>{40} likes</span>
						</div>
						<div className="text-white/70 flex items-center text-xs sm:text-sm">
							<MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
							<span>{90} comments</span>
						</div>
					</div>
				</div>
			</div>

			<div className="px-2">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<div className="sm:p-8">
							{/* Article Content */}
							<div className="">
								<div
									className="prose prose-lg prose-invert max-w-none"
									dangerouslySetInnerHTML={{ __html: blog?.content ?? '' }}
								/>
							</div>

							{/* Tags */}
							<div className="mt-6 mb-4 px-4 sm:px-6 md:px-8 flex flex-wrap gap-2">
								{blog?.tags.map((tag, index) => (
									<Link
										key={index}
										href={`/blog/tag/${tag}`}
										className="flex items-center px-2 py-1 text-xs sm:text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
									>
										<TagIcon className="w-3 h-3 mr-1" />
										{tag}
									</Link>
								))}
							</div>

							{/* Action Bar */}
							<div className="border-t border-white/10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-wrap justify-between items-center gap-4">
								<div className="flex items-center space-x-4">
									<Link
										href={`/dashboard/fullblog/${blog?.id}`}
										className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
									>
										<Eye className="h-4 w-4 sm:h-5 sm:w-5" />
										<span>Read in dashboard</span>
									</Link>

									<button className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors group text-xs sm:text-sm">
										<Share2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-blue-400" />
										<span>Share</span>
									</button>
								</div>

								<div className="flex items-center space-x-2">
									<Image
										height={100}
										width={100}
										src={blog?.authorImgUrl.toString() ?? ''}
										alt={'das'}
										className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10"
										onError={e => {
											e.currentTarget.src = 'https://dummyimage.com/40x40';
										}}
									/>
									<div>
										<div className="text-xs sm:text-sm font-medium">
											{blog?.author.name}
										</div>
										<div className="text-xs text-white/60">Author</div>
									</div>
								</div>
							</div>
						</div>

						{/* Comments Section Preview */}
						<div className="mt-4 sm:mt-6 lg:mt-8 bg-[#111111] border border-white/5 rounded-xl shadow-xl overflow-hidden">
							<div className="p-4 sm:p-6">
								<h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
									Comments ({blog?.comments.length})
								</h3>

								{session.isPending ? (
									// Loading state for user authentication
									<div className="mb-6">
										<div className="flex items-start sm:items-center gap-3 mb-4">
											<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 animate-pulse"></div>
											<div className="flex-1">
												<div className="w-full h-10 sm:h-12 bg-white/10 rounded-lg animate-pulse"></div>
											</div>
										</div>
									</div>
								) : !session.isPending && user ? (
									// Comment form for logged-in users
									<div className="mb-6">
										<div className="flex items-start sm:items-center gap-3 mb-4">
											<Image
												height={1000}
												width={1000}
												src={
													user.image || "https://dummyimage.com/40"
												}
												alt="Your profile"
												className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10"
												onError={(e) => {
													e.currentTarget.src =
														"https://dummyimage.com/40";
												}}
											/>
											<div className="flex-1">
												<div className="relative">
													<div className="flex"
													>
														<input
															type="text"
															value={comment}
															onChange={(e) => setComment(e.target.value)}
															placeholder="Add a comment..."
															className="w-full p-2 sm:p-3 pr-10 sm:pr-12 bg-[#0a0a0a] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-white/40 text-white text-sm"
															disabled={isSubmitting}
														/>
														<button
															type="submit"
															disabled={!comment || isSubmitting}
															onClick={handleCommentSubmit}
															className={`p-2 rounded-full size-fit -translate-x-10 translate-y-1 cursor-pointer ${comment && !isSubmitting
																? "text-blue-500 hover:bg-white/5"
																: "text-white/30"
																} transition-colors ${isSubmitting ? "animate-pulse" : ""
																}`}
														>
															<SendHorizontal className="w-4 h-4 sm:w-5 sm:h-5 " />
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									// Login prompt for non-logged in users
									<div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
										<p className="text-white/80 text-sm sm:text-base mb-2">
											Join the conversation and share your thoughts on this
											post.
										</p>
										<Link
											href={`/dashboard/fullblog/${blog?.id}`}
											className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
										>
											Sign in to comment
										</Link>
									</div>
								)}
								{/* Comments List Preview */}
								<div className="space-y-4 sm:space-y-6 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
									{commentState === "submitting" ||
										commentState === "loading" ? (
										// Loading state for new comments being submitted
										<div className="animate-pulse space-y-4">
											{[...Array(3)].map((_, index) => (
												<div
													key={index}
													className="border-b border-white/5 pb-4 sm:pb-6"
												>
													<div className="flex items-start gap-3">
														<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10"></div>
														<div className="flex-1">
															<div className="w-24 h-4 bg-white/10 rounded mb-2"></div>
															<div className="w-full h-10 bg-white/10 rounded"></div>
														</div>
													</div>
												</div>
											))}
										</div>
									) : blog?.comments.length === 0 ? (
										<div className="text-center p-6 sm:p-8 text-white/50">
											<MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-30" />
											<p className="text-sm sm:text-base">
												No comments yet. Be the first to comment!
											</p>
										</div>
									) : (
										blog?.comments.slice(0, 3).map((comment) => (
											<div
												key={comment.id}
												className="border-b border-white/5 pb-4 sm:pb-6"
											>
												<div className="flex items-start gap-3">
													<Image
														height={1000}
														width={1000}
														src={
															comment.user.image ??
															"https://imgs.search.brave.com/VneMoX7Cl7XDPD7DguYtmdLDfVBIwtaLV6fbnFx77Jc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzU0LzA5LzI3/LzM2MF9GXzEwNTQw/OTI3ODBfbGlPYllR/bzEwUG4yeE9vNENt/R1laTWVXaXcwUDdD/VDIuanBn"
														}
														alt={comment.user.name}
														className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10"
														onError={(e) => {
															e.currentTarget.src =
																"https://dummyimage.com/40";
														}}
													/>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<span className="font-medium text-sm sm:text-base">
																{comment.user.name}
															</span>
															<span className="text-xs text-white/50">
																{new Date(
																	comment.commentedAt
																).toLocaleDateString("en-US", {
																	month: "short",
																	day: "numeric",
																	year: "numeric",
																})}
															</span>
														</div>
														<p className="text-white/80 text-sm sm:text-base">
															{comment.comment}
														</p>
													</div>
												</div>
											</div>
										))
									)}

									{blog?.comments.length !== undefined && blog?.comments.length > 3 && (
										<div className="text-center pt-2">
											<Link
												href={`/dashboard/fullblog/${blog?.id}`}
												className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
											>
												View all {blog?.comments.length} comments
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1 space-y-4 sm:space-y-6">
						{/* Author Card */}
						<div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl overflow-hidden">
							<div className="p-4 sm:p-6">
								<h3 className="text-base sm:text-lg font-bold mb-4 border-b border-white/10 pb-2">
									About the Author
								</h3>
								<div className="flex items-center mb-4">
									<Image
										height={1000}
										width={1000}
										src={blog?.authorImgUrl ?? "https://dummyimage.com/64x64"}
										alt={blog?.author.name ?? "Author"}
										className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500 mr-3 sm:mr-4"
										onError={(e) => {
											e.currentTarget.src = "https://via.placeholder.com/64";
										}}
									/>
									<div>
										<h4 className="font-bold text-sm sm:text-base">
											{blog?.author.name}
										</h4>
										<p className="text-white/70 text-xs sm:text-sm">
											Content Creator
										</p>
									</div>
								</div>
								<p className="text-white/80 text-xs sm:text-sm mb-4">
									Author of insightful articles and thought-provoking content.
								</p>
								<Link
									href={`/dashboard`}
									className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
								>
									<UserIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
									Join BlogStack
								</Link>
							</div>
						</div>

						{/* Related Posts */}
						{relatedPosts && relatedPosts.length > 0 && (
							<div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl overflow-hidden">
								<div className="p-4 sm:p-6">
									<h3 className="text-base sm:text-lg font-bold mb-4 border-b border-white/10 pb-2">
										Related Posts
									</h3>
									<div className="space-y-4">
										{relatedPosts.map(
											(post => (
												<Link
													key={post.id}
													href={`/blog/${post.id}`}
													className="block group"
												>
													<div className="flex gap-3 items-start">
														<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
															{post.imgUrl ? (
																<Image
																	height={1000}
																	width={1000}
																	src={post.imgUrl}
																	alt={post.title}
																	className="w-full h-full object-cover group-hover:scale-105 transition-transform"
																	onError={(e) => {
																		e.currentTarget.parentElement?.classList.add(
																			"bg-gradient-to-r",
																			"from-blue-500/20",
																			"to-purple-500/20"
																		);
																		e.currentTarget.style.display = "none";
																	}}
																/>
															) : (
																<div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
																	<TagIcon className="w-6 h-6 text-blue-400" />
																</div>
															)}
														</div>
														<div>
															<h4 className="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-blue-400 transition-colors">
																{post.title}
															</h4>
															<div className="flex items-center gap-2 mt-1 text-xs text-white/60">
																<span>{post.author.name}</span>
																<span>•</span>
																<span className="flex items-center">
																	<Heart className="w-3 h-3 mr-1" />
																	{post.likes.length}
																</span>
															</div>
															{post.tags && post.tags.length > 0 && (
																<span className="inline-block text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded mt-1">
																	{post.tags[0]}
																</span>
															)}
														</div>
													</div>
												</Link>
											))
										)}
									</div>
								</div>
							</div>
						)}

						{/* Join Banner */}
						{
							!user ? (
								<div className="bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500 rounded-xl shadow-xl overflow-hidden">
									<div className="p-4 sm:p-6">
										<h3 className="text-base sm:text-lg font-bold mb-2">
											Join BlogStack Community
										</h3>
										<p className="text-white/90 text-xs sm:text-sm mb-4">
											Create your own blog posts, engage with other writers, and
											build your audience.
										</p>
										<Link
											href="/dashboard"
											className="inline-block w-full text-center bg-white text-blue-600 font-medium text-sm py-2 px-4 rounded-lg hover:bg-white/90 transition-colors"
										>
											Get Started
										</Link>
									</div>
								</div>) : null
						}

					</div>
				</div>
			</div>
		</div >
	)
};
export default Blog;
