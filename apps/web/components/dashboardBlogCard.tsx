"use client";

import Link from "next/link";
import { formatDate } from "date-fns";
import {
	Bookmark,
	Image as ImageIcon,
	MessageCircle,
	Heart,
	Clock,
	ArrowRight,
	Share2,
	Trash2,
	EyeIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardBlogData } from "@/types/blogs";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

// Function to strip HTML tags from content
function stripHtml(html: string): string {
	// Check if we're in the browser environment
	if (typeof document !== "undefined") {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	}

	// Server-side fallback - simple regex to strip HTML tags
	return html.replace(/<[^>]*>?/gm, "");
}

// Estimated reading time calculation
function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = stripHtml(content).split(/\s+/).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// Loading skeleton component

const BlogCard = (blog: DashboardBlogData) => {
	// Strip HTML and limit preview length
	const contentPreview =
		stripHtml(blog.content).substring(0, 120) +
		(blog.content.length > 120 ? "..." : "");
	const [imageError, setImageError] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState<boolean>(blog.bookmarked);
	const [likeCount, setLikeCount] = useState<number>(blog.likes);
	const [isLoading, setIsLoading] = useState(true);
	const { data: session } = useSession(); // Use better-auth session
	const readingTime = calculateReadingTime(blog.content);

	// API request helper function
	const apiRequest = async (url: string, options: RequestInit = {}) => {
		try {
			const response = await fetch(url, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options.headers,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('API request failed:', error);
			throw error;
		}
	};

	// Check if user has already liked the post
	useEffect(() => {
		if (session?.user && blog.id) {
			// Check if user has already liked the post
			const checkLikeStatus = async () => {
				try {
					const data = await apiRequest(
						`/api/checklike?postId=${blog.id}&userId=${session.user.id}`
					);
					setIsLiked(data.isLiked);
				} catch (error) {
					console.error("Error checking like status", error);
				}
			};

			// Check if user has already bookmarked the post
			const checkBookmarkStatus = async () => {
				try {
					const data = await apiRequest(
						`/api/checkbookmark?postId=${blog.id}&userId=${session.user.id}`
					);
					setIsBookmarked(data.isBookmarked);
				} catch (error) {
					console.error("Error checking bookmark status", error);
				} finally {
					setIsLoading(false);
				}
			};

			Promise.all([checkLikeStatus(), checkBookmarkStatus()]);
		} else {
			setIsLoading(false);
		}
	}, [session, blog.id]);


	const toggleLike = async () => {
		if (!session?.user) return;

		try {
			if (isLiked) {
				await apiRequest('/api/removelike', {
					method: 'DELETE',
					body: JSON.stringify({
						postId: blog.id.toString(),
						userId: session.user.id,
					}),
				});
				setLikeCount((prev) => Math.max(0, prev - 1));
			} else {
				await apiRequest('/api/addlike', {
					method: 'POST',
					body: JSON.stringify({
						postId: blog.id.toString(),
						userId: session.user.id,
					}),
				});
				setLikeCount((prev) => prev + 1);
			}
			setIsLiked(!isLiked);
		} catch (error) {
			console.error('Error toggling like:', error);
			// Optionally revert the optimistic update
		}
	};

	// Handle bookmark
	const toggleBookmark = async () => {
		if (!session?.user) return;

		try {
			if (isBookmarked) {
				await apiRequest('/api/removebookmarks', {
					method: 'POST',
					body: JSON.stringify({
						postId: blog.id.toString(),
						userId: session.user.id,
					}),
				});
			} else {
				await apiRequest('/api/addbookmark', {
					method: 'POST',
					body: JSON.stringify({
						postId: blog.id.toString(),
						userId: session.user.id,
					}),
				});
			}
			setIsBookmarked(!isBookmarked);
		} catch (error) {
			console.error('Error toggling bookmark:', error);
			// Optionally revert the optimistic update
		}
	};

	// Handle delete
	const handleDelete = async () => {
		if (!session?.user) return;

		try {
			await apiRequest('/api/deleteBlog', {
				method: 'DELETE',
				body: JSON.stringify({
					id: blog.id,
				}),
			});
			// You might want to trigger a refresh or remove the item from the list
			// This depends on how your parent component handles state
		} catch (error) {
			console.error('Error deleting blog:', error);
		}
	};

	if (isLoading) {
		return <BlogCardSkeleton />;
	}

	return (
		<article className="group bg-gradient-to-b from-[#111111] to-[#0c0c0c] rounded-xl overflow-hidden shadow-md border border-white/5 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full relative before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent before:hover:border-blue-500/30 before:pointer-events-none before:transition-colors before:z-10">
			<div className="relative h-48 sm:h-56 overflow-hidden">
				{blog.imgUrl && !imageError ? (
					<>
						<Image
							height={1000}
							width={1000}
							src={blog.imgUrl}
							alt={blog.title}
							className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
							onError={() => setImageError(true)}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
					</>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 flex items-center justify-center">
						<div className="text-center">
							<ImageIcon className="w-12 h-12 md:w-14 md:h-14 text-blue-400 mx-auto mb-2 opacity-80" />
							<p className="text-sm md:text-base text-white/70 px-4 truncate max-w-full">
								{blog.title}
							</p>
						</div>
					</div>
				)}

				{/* Tags container */}
				<div className="absolute top-3 left-3 flex gap-2 flex-wrap z-20">
					{blog.tags && blog.tags.length > 0 ? (
						blog.tags.slice(0, 2).map((tag, index) => (
							<Link
								href={`/dashboard/blog/${tag}`}
								key={index}
								className="px-3 py-1 text-xs font-medium bg-blue-500/90 hover:bg-blue-600/90 text-white rounded-full shadow-sm transition-colors hover:shadow-md hover:shadow-blue-500/20"
							>
								{tag}
							</Link>
						))
					) : (
						<span className="px-3 py-1 text-xs font-medium bg-blue-500/90 text-white rounded-full shadow-sm">
							Article
						</span>
					)}
					{blog.tags && blog.tags.length > 2 && (
						<span className="px-3 py-1 text-xs font-medium bg-white/10 hover:bg-white/20 text-white/90 rounded-full shadow-sm cursor-pointer transition-colors">
							+{blog.tags.length - 2}
						</span>
					)}
				</div>

				{/* Reading time */}
				<div className="absolute bottom-3 right-3 z-20">
					<div className="flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
						<Clock className="h-3 w-3 text-white/70 mr-1" />
						<span className="text-xs text-white/80">
							{readingTime} min read
						</span>
					</div>
				</div>
			</div>

			<div className="p-5 flex-1 flex flex-col">
				<Link href={`/dashboard/fullblog/${blog.id}`} className="flex-1">
					<h2 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
						{blog.title}
					</h2>

					<p className="text-white/60 text-sm mb-4 line-clamp-2">
						{contentPreview}
					</p>
				</Link>

				{/* Author and date */}
				<div className="flex items-center justify-between text-sm text-white/60 mb-4">
					<div className="flex items-center">
						<div className="relative">
							<Image
								height={1000}
								width={1000}
								src={blog.authorImgUrl || "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOL2sdn6AYe0XpifuAcUyr23E9Yw7IWgQsoNjkb"}
								alt={blog.authorName || "Anonymous"}
								className="w-8 h-8 rounded-full mr-3 border border-white/10 object-cover"
								onError={(e) => {
									e.currentTarget.src = "https://via.placeholder.com/32";
								}}
							/>
						</div>
						<div>
							<p className="font-medium text-white/80">
								{blog.authorName || "Anonymous"}
							</p>
							<p className="text-xs">
								{formatDate(new Date(), "MMM d, yyyy")}
							</p>
						</div>
					</div>
					<div className="flex gap-1 items-center mr-2">
						<EyeIcon className="h-4 w-4" />
						{blog.views}
					</div>
				</div>

				{/* Divider */}
				<div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

				{/* Stats and actions */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleLike}
							className={`flex items-center space-x-1.5 px-2 py-1 rounded-lg transition-colors ${isLiked
								? "text-red-400 bg-red-500/10"
								: "text-white/60 hover:text-white/90 hover:bg-white/5"
								}`}
						>
							<Heart
								className={`w-4 h-4 ${isLiked ? "fill-red-400" : ""
									} transition-all duration-300 ${isLiked ? "scale-110" : ""}`}
							/>
							<span className="text-xs font-medium">{likeCount}</span>
						</button>

						<div className="flex items-center space-x-1.5 text-white/60">
							<MessageCircle className="w-4 h-4" />
							<span className="text-xs font-medium">{blog.comments}</span>
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<button
							onClick={() => {
								if (navigator.share) {
									navigator
										.share({
											title: blog.title,
											text: stripHtml(blog.content).substring(0, 100) + "...",
											url:
												window.location.origin +
												`/dashboard/fullblog/${blog.id}`,
										})
										.catch((err) => console.error("Error sharing:", err));
								}
							}}
							className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors group/share"
						>
							<Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
						</button>

						<button
							onClick={toggleBookmark}
							className={`p-2 rounded-lg transition-colors ${isBookmarked
								? "text-blue-400 bg-blue-500/10"
								: "text-white/60 hover:text-white/90 hover:bg-white/5"
								}`}
						>
							<Bookmark
								className={`w-4 h-4 ${isBookmarked ? "fill-blue-400" : ""
									} transition-all duration-300 ${isBookmarked ? "scale-110" : "group-hover:scale-110"
									}`}
							/>
						</button>
						{blog.deleteable ? (
							<button
								className="p-2 rounded-lg hover:bg-red-200/30"
								onClick={handleDelete}
							>
								<Trash2 className="h-4 w-4 text-red-400" />
							</button>
						) : null}
						<Link
							href={`/dashboard/fullblog/${blog.id}`}
							className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-200 font-medium text-xs"
						>
							<span>Read</span>
							<ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
};

export default BlogCard;
