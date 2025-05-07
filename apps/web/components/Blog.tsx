"use client"
import { BlogData } from "@/types/blogs";
import { ArrowLeft, Calendar, Eye, Heart, ImageIcon, MessageCircle, Share2, TagIcon } from "lucide-react"
import Link from "next/link"

import { useRouter } from "next/navigation";
import { useState } from "react";

const Blog = (blog: BlogData | null) => {


  const navigate = useRouter()
  const [imageError, setImageError] = useState<boolean>(false)
  return (
    <div className="flex-grow pb-10 md:pb-20">
      {/* Hero Section with Blog Image */}
      <div className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] relative max-w-7xl mx-auto">
        {blog?.imgUrl && !imageError ? (
          <img
            src={blog.imgUrl}
            alt={blog.title}
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
              <img
                src={blog?.authorImgUrl}
                alt={blog?.authorId}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 mr-2 sm:mr-3"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/40";
                }}
              />
              <span className="text-white/90 text-sm sm:text-base">
                {'authour'}
              </span>
            </div>
            <div className="text-white/70 flex items-center text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />


              {/*               <span>{formatDate(blog?.publishDate)}</span>
 */}
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
                  dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
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

                  <button
                    className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors group text-xs sm:text-sm"
                  >
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-blue-400" />
                    <span>Share</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <img
                    src={blog?.authorImgUrl}
                    alt={"das"}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/40";
                    }}
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-medium">
                      {"Asd"}
                    </div>
                    <div className="text-xs text-white/60">Author</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section Preview */}
          </div>

          {/* Join Banner */}
        </div>
      </div>
    </div>
  )
}
export default Blog
