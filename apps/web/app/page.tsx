import Link from "next/link";
import { getFeaturedBlogs } from "./api/blogs";
import { ArrowRight, Calendar, Heart, MessageCircle, TagIcon } from "lucide-react";
import React from 'react'
export default async function Home() {
  const featuredBlogs: any = await getFeaturedBlogs();
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
              Create, share, and discover amazing blog posts. Join our community
              of writers and readers.
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
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Blogs</h2>
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
            <ArrowRight className="inline-block ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog: any) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden">
                {blog.imgUrl ? (
                  <img
                    src={blog.imgUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-white/80 px-4">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                  <div className="flex items-center">
                    <img
                      src={
                        blog.authorImgUrl || "https://via.placeholder.com/32"
                      }
                      alt={blog.author.name || "Author"}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>{blog._count.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>{blog._count.comments}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="flex items-center px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-lg"
                    >
                      <TagIcon className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
