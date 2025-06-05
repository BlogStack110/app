"use server";
import { prisma } from "@/lib/db";
// import { getRedisConfig } from "@/lib/url";
// import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";

export const pushComment = async (postId: string, userId: string, comment: string) => {
	// const redis = new Redis(getRedisConfig());
	// await redis.del(`blog:${postId}`);
	await prisma.comment.create({
		data: {
			id: randomUUID(),
			userId: userId,
			comment: comment,
			postId: postId,
		},
	});
}
