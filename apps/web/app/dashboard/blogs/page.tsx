import { getBlogs } from "@/app/actions/fetchBlogs/route";
import BlogCard from "@/components/dashboardBlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";

function stripHtml(html: string): string {
	// Check if we're in the browser environment
	if (typeof document !== "undefined") {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	}

	// Server-side fallback - simple regex to strip HTML tags
	return html.replace(/<[^>]*>?/gm, "");
}

export default async function Page({ searchParams }: { searchParams: { search?: string, page?: string } }) {
	const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
	const searchQuery = searchParams.search ? searchParams.search : undefined
	const blogsFetcher = await getBlogs(page, searchQuery);
	const { blogs, pagination } = blogsFetcher.body;


	return (
		<div className="space-y-8 mt-10">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">
						{searchQuery ? (<div className="flex gap-1">{blogs?.length !== 0 ? "Search" : "No"} results for <p className="text-blue-600">"</p><p className="underline decoration-blue-600">{searchQuery}</p><p className="text-blue-600 ">"</p></div>) : "All Blogs"}
					</h1>
					<p className="text-white/60">
						{searchQuery
							? `Found ${blogs?.length} posts matching your search`
							: "Discover and explore amazing blog posts"}
					</p>
				</div>
				<Link
					href="/dashboard/write"
					className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
				>
					<Plus className="w-5 h-5" />
					<span>Write a new blog</span>
				</Link>
			</div>
			{/* Search and Filter Section */}
			<form className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<div>
						<Input
							type="text"
							name="search"
							placeholder="Search blogs..."
							defaultValue={searchQuery || ""}
							className="w-full px-4 py-6 pl-12 rounded-xl bg-[#0a0a0a] border  border-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
						/>
						<button
							className="absolute left-4 top-1/2 -translate-y-1/2"
						>
							<Search className="w-5 h-5 text-gray-400 dark:text-white/40 cursor-pointer" />
						</button>
					</div>
				</div>
				<Button className="inline-flex items-center space-x-2 px-6 py-6 rounded-xl bg-[#0a0a0a] border border-white/5 text-white cursor-pointer transition-colors">
					<Filter className="w-5 h-5" />
					<span>Filter</span>
				</Button>
			</form>

			{/* Blogs Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogs ? blogs?.length > 0 ? (
					blogs?.map((blog) => (
						<BlogCard
							key={blog.id}
							views={blog._count.views}
							id={blog.id}
							title={blog.title}
							content={stripHtml(blog.content).substring(0, 120)}
							likes={blog._count.likes}
							comments={blog._count.comments}
							likeCount={23}
							authorName={blog.author.name ?? ""}
							authorImgUrl={blog.authorImgUrl}
							authorId={blog.authorId}
							tags={blog.tags}
							publishDate={blog.publishDate}
							imgUrl={blog.imgUrl}
							bookmarked={true}
						/>
					))
				) : (
					<div className="col-span-3 text-center py-10">
						<p className="text-lg text-gray-600 dark:text-white/60">
							{searchQuery
								? `No blogs found matching "${searchQuery}". Try a different search term.`
								: "No blogs found. Be the first to write one!"}
						</p>
					</div>
				) : null}
			</div>

			{/* Pagination */}
			{blogs?.length > 0 && pagination?.totalPages > 1 && (
				<div className="flex justify-center items-center space-x-2 mt-6 md:mt-8">
					<button
						className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors ${pagination.hasPrevPage
							? "bg-[#111111] text-white hover:bg-[#1a1a1a] border border-white/10 cursor-pointer"
							: "bg-[#111111] text-white/40 cursor-not-allowed border border-white/5"
							}`}
						disabled={!pagination.hasPrevPage}
					>

						<a href={` ${(Number(pagination.currentPage) - 1) > 1 ? ('/dashboard/blogs?page=' + Number(pagination.currentPage - 1)) : "/dashboard/blogs"}`}>
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
						<a href={`/dashboard/blogs?page=${pagination.currentPage + 1}`}>
							Next
						</a>
					</button>
				</div>
			)}
		</div >
	);
}
