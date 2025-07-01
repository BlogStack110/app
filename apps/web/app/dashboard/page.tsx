
import Link from 'next/link';
import { Plus, TrendingUp, Bookmark, Clock } from 'lucide-react';
import BlogCard from '@/components/dashboardBlogCard';
import { getDashboardData } from '../actions/dashboardData';
import { authClient } from '@/lib/auth-client';
import { formatDate } from 'date-fns';
import { Welcome } from '@/components/welcomePanel';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard | Blogstack',
	description: 'Manage your posts and interactions',
	openGraph: {
		title: 'Dashboard | Blogstack',
		description: 'Manage your posts and interactions',
		images: [
			{
				url: 'https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVHwHlnP18aupHxIdmj9WvyiofM5sPS1gAGDB',
				width: 1200,
				height: 630,
				alt: 'Blogstack - Create, share, and discover amazing blog posts',
			},
		],
		type: 'website',
		siteName: 'Blogstack',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Home | Blogstack',
		description: 'Create, share, and discover amazing blog posts. Join our community of writers and readers.',
		images: ['https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVHwHlnP18aupHxIdmj9WvyiofM5sPS1gAGDB'],
	},
	metadataBase: new URL('https://blogstack.com'), // Replace with your actual domain
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
	const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
	const session = await authClient.getSession();
	const dashboardData = await getDashboardData(page);
	const { posts, bookmarks, blogs, pagination } = dashboardData.body
	const joinDate: Date | undefined = session?.data?.user?.createdAt

	return (
		<div className="space-y-8">
			{/* Hero Section */}

			<Welcome />

			{/* Stats Section */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				<Link href="/dashboard/myblogs" className="block">
					<div className="bg-[#111111] p-5 md:p-6 rounded-xl shadow border border-white/5 hover:border-blue-500/30 hover:bg-[#131313] transition-all">
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-blue-500/10 rounded-xl">
								<TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
							</div>
							<div>
								<p className="text-sm text-white/60">Your Posts</p>
								<h3 className="text-xl md:text-2xl font-bold text-white">
									{posts}
								</h3>
							</div>
						</div>
					</div>
				</Link>

				<Link href="/dashboard/bookmarks" className="block">
					<div className="bg-[#111111] p-5 md:p-6 rounBeing a guy who loves the cinematic art in any form, seeing this trend getting this scale of traction is simply sad. I have profound respect for the studio and I was amazed by their work when I discovered movies like Castle in The Sky, Grave of the Fireflies, Spirited away, etc. And when I got to know how these movies are made and how much manual effort it takes to produce them, my appreciation only increased. But here comes some AI tool that can replicate this in a matter of minutes. This is no less than a slap on the faces of artists who spend hours imagining and creating something like this.

I am not against AI, or advancements it is making. But there must be a limit to this. You can cut a fruit as well as stab someone with a kitchen knife. Right now, it is the latter happening with the use of AI tools just for cheap social media points. Sad state of affairs.

What do you think? Do you guys like his trend?ded-xl shadow border border-white/5 hover:border-green-500/30 hover:bg-[#131313] transition-all">
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-green-500/10 rounded-xl">
								<Bookmark className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
							</div>
							<div>
								<p className="text-sm text-white/60">Saved Posts</p>
								<h3 className="text-xl md:text-2xl font-bold text-white">
									{bookmarks}
								</h3>
							</div>
						</div>
					</div>
				</Link>

				<div className="bg-[#111111] p-5 md:p-6 rounded-xl shadow border border-white/5 sm:col-span-2 lg:col-span-1">
					<div className="flex items-center space-x-4">
						<div className="p-3 bg-orange-500/10 rounded-xl">
							<Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
						</div>
						<div>
							<p className="text-sm text-white/60">Member Since</p>
							<h3 className="text-xl md:text-2xl font-bold text-white">
								{formatDate(joinDate ?? new Date(), "MMM yyyy")}
							</h3>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Blogs Section */}
			<div>
				<div className="flex items-center justify-between mb-4 md:mb-6">
					<h2 className="text-xl md:text-2xl font-bold text-white">
						Recent Blogs
					</h2>
					<Link
						href="/dashboard/blogs"
						className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center"
					>
						View all <span className="ml-1">→</span>
					</Link>
				</div>

				{blogs.length === 0 ? (
					<div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden shadow-lg">
						<div className="px-6 py-12 md:py-16 flex flex-col items-center text-center">
							<div className="w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8 relative">
								<div
									className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"
									style={{ animationDuration: "3s" }}
								></div>
								<div
									className="absolute inset-4 bg-blue-500/30 rounded-full animate-pulse"
									style={{ animationDuration: "4s", animationDelay: "0.3s" }}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="64"
										height="64"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-blue-400"
									>
										<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
										<polyline points="14 2 14 8 20 8"></polyline>
										<path d="M8 13h2"></path>
										<path d="M8 17h2"></path>
										<path d="M14 13h2"></path>
										<path d="M14 17h2"></path>
									</svg>
								</div>
							</div>
							<h3 className="text-xl md:text-2xl font-bold text-white mb-3">
								No blogs to show yet
							</h3>
							<p className="text-white/70 max-w-md mb-8 text-sm md:text-base">
								It seems like there are no published blogs at the moment. Be the
								first to share your thoughts and insights with the community!
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href="/dashboard/blog/solo"
									className="inline-flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
								>
									<Plus className="w-5 h-5" />
									<span>Write your first blog</span>
								</Link>
								<Link
									href="/blog"
									className="inline-flex items-center justify-center space-x-2 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
								>
									<span>Explore public blogs</span>
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
						{blogs.map((blog) => (
							<BlogCard
								key={blog.id}
								id={blog.id}
								title={blog.title}
								content={blog.content}
								likes={blog._count.likes}
								comments={blog._count.comments}
								likeCount={blog._count.likes}
								views={blog._count.views}
								authorName={blog.author.name || "Anonymous"}
								authorImgUrl={blog.author.pfpUrl || ""}
								authorId={blog.authorId}
								tags={blog.tags}
								publishDate={blog.publishDate}
								imgUrl={blog.imgUrl}
								bookmarked={false}
							/>
						))}
					</div>
				)}

				{/* Pagination */}
				{blogs.length > 0 && pagination.totalPages > 1 && (
					<div className="flex justify-center items-center space-x-2 mt-6 md:mt-8">
						<button
							className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors ${pagination.hasPrevPage
								? "bg-[#111111] text-white hover:bg-[#1a1a1a] border border-white/10 cursor-pointer"
								: "bg-[#111111] text-white/40 cursor-not-allowed border border-white/5"
								}`}
							disabled={!pagination.hasPrevPage}
						>

							<a href={` ${(Number(pagination.currentPage) - 1) > 1 ? ('/dashboard?page=' + Number(pagination.currentPage - 1)) : "/dashboard"}`}>
								Previous
							</a>
						</button>
						<span className="px-3 py-2 md:px-4 md:py-2 text-sm font-medium text-white">
							Page {pagination.currentPage} of {pagination.totalPages}
						</span>
						<button
							className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors ${pagination.hasNextPage
								? "bg-[#111111] text-white hover:bg-[#1a1a1a] border border-white/10 cursor-pointer"
								: "bg-[#111111] text-white/40 cursor-not-allowed border border-white/5"
								}`}
							disabled={!pagination.hasNextPage}
						>
							<a href={`/dashboard?page=${pagination.currentPage + 1}`}>
								Next
							</a>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
