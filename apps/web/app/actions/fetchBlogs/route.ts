import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/db";

export const getBlogs = async (page: number, searchQuery: string | undefined) => {
  const limit = 9;
  const skip = (page - 1) * limit;

  try {
    // Build the where clause based on search query
    let whereClause: Prisma.PostWhereInput = {};

    if (searchQuery) {
      whereClause = {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            tags: {
              has: searchQuery,
            },
          },
        ],
      };
    }

    const [totalPosts, posts] = await Promise.all([
      prisma.post.count({ where: whereClause }),
      prisma.post.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { publishDate: "desc" },
        include: {
          author: {
            select: {
              name: true,
              pfpUrl: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
              views: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    return {
      status: "success",
      body: {
        blogs: posts,
        pagination: {
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        searchQuery,
      },
    };
  } catch (error) {
    console.error("Error loading blogs:", error);
    return {
      status: "error",
      body: {
      }
    }
  }
}
