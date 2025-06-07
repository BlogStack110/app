"use client"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"

export const Welcome = () => {
  const user = useSession().data?.user
  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-2xl p-6 md:p-8 text-white border border-white/5">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
        Welcome back,{" "}
        <span className="text-blue-400">
          {user?.name || user?.email.split("@")[0]}
        </span>
        !
      </h1>
      <p className="text-base md:text-lg text-white/90 mb-5 md:mb-6">
        Discover the latest insights and share your knowledge with the
        community.
      </p>
      <Link
        href="/dashboard/blog/solo"
        className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
      >
        <Plus className="w-4 h-4 md:w-5 md:h-5" />
        <span>Write a new blog</span>
      </Link>
    </div>
  )
}


