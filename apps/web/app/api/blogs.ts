import { prisma } from "../../lib/db";

// Fetch featured blogs
export const getFeaturedBlogs: any = async () => {
  const blogs = await prisma.post.findMany({
    take: 6,
    orderBy: {
      publishDate: "desc",
    },
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
  });
  return blogs;
};
