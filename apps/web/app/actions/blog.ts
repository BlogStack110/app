"use server"
import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/db";
import { getRedisConfig } from "lib/url";
import { randomUUID } from "node:crypto";

export async function getBlogById(id: string) {
  try {
    const redis = new Redis(getRedisConfig());
    const cacheKey = `blog:${id}`;
    const cachedBlog = await redis.get(cacheKey);

    if (cachedBlog) {
      const blog = JSON.parse(JSON.stringify(cachedBlog));
      await redis.expire(`blog:${blog.id}`, 60 * 60);
      await redis.setnx(`blog:${blog?.id}:views`, blog?.views.length);
      await redis.incr(`blog:${blog.id}:views`);
      await redis.expire(`blog:${blog.id}:views`, 15 * 60);

      return blog;
    }

    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            name: true,
            pfpUrl: true,
            email: true,
            openToCollab: true,
          },
        },
        likes: true,
        views: true,
        comments: {
          orderBy: {
            commentedAt: "desc",
          },
          include: {
            user: true,
            replies: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!blog) return null;

    await redis.set(cacheKey, JSON.stringify(blog));
    await redis.expire(cacheKey, 60 * 60);
    await redis.setnx(`blog:${blog?.id}:views`, blog?.views.length);
    await redis.expire(`blog:${blog?.id}:views`, 15 * 60);

    return blog;
  } catch (error) {
    console.error("Error getting blog:", error);
    return null;
  }
}

export async function getViewCount(blogId: number) {
  try {
    const redis = new Redis(getRedisConfig());
    const viewCount = await redis.get(`blog:${blogId}:views`);
    return viewCount as number || 0;
  } catch (error) {
    console.error("Error getting view count:", error);
    return 0;
  }
}

export async function updateViews(postId: string, userId: string) {
  try {
    const viewId = randomUUID();
    await prisma.view.create({
      data: {
        id: viewId,
        postId,
        userId,
      },
    });

    const redis = new Redis(getRedisConfig());
    await redis.incr(`blog:${postId}:views`);

    return true;
  } catch (error) {
    console.error("Error updating views:", error);
    return false;
  }
}
