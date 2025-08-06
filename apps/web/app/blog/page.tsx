import { Metadata } from "next";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import BlogCard from "@/components/BlogCard";
import { Search } from "lucide-react";
import { featuredBlog } from "@/types/blogs";
import { getFeaturedBlogs } from "../api/blogs";

export const metadata: Metadata = {
  title: "Blogs | Blogstack",
  description: "Explore amazing blog posts from our community of writers.",
};

export default async function BlogPage() {
  const blogs: featuredBlog[] = await getFeaturedBlogs();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-black via-gray-900 to-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-gradient">
                Explore Amazing Stories
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                Discover thought-provoking articles, tutorials, and stories from
                our community of writers.
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200 backdrop-blur-sm"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors duration-200" />
                </div>
              </div>{" "}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-200 border border-blue-500/10 hover:border-blue-500/20">
                All Posts
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/10">
                Technology
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/10">
                Design
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/10">
                Business
              </button>
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="transform hover:-translate-y-2 transition-all duration-300"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
              Load More Posts
            </button>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
