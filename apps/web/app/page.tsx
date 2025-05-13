import Link from "next/link";
import { getFeaturedBlogs } from "./api/blogs";
import { ArrowRight, Calendar, Heart, MessageCircle, TagIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { featuredBlog } from "@/types/blogs";
import BlogCard from "@/components/BlogCard";
export default async function Home() {
  const featuredBlogs: featuredBlog[] = await getFeaturedBlogs();
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Share Your Story with the World
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Create, share, and discover amazing blog posts. Join our community of writers and
              readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <Link
                href={"/blog"}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors z-10"
              >
                Explore Blogs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href={"/"}
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors z-10"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>
        f     </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Blogs</h2>
          <Link href="/blog/" className="text-blue-400 hover:text-blue-300 transition-colors">
            View All
            <ArrowRight className="inline-block ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}

        </div>
      </div>
      <div className="bg-[#111111] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">
                Create Beautiful Posts
              </h3>
              <p className="text-white/60">
                Write and format your content with our rich text editor
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">
                Engage with Community
              </h3>
              <p className="text-white/60">
                Connect with other writers and readers through comments and
                likes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">
                Reach Global Audience
              </h3>
              <p className="text-white/60">
                Share your thoughts with readers from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
