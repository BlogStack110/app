'use server';
import {prisma} from '@/lib/db';
import {randomUUID} from 'node:crypto';

export async function getLikes(userId: string) {
	try {
		const likes = await prisma.like.findMany({
			where: {
				userId: userId,
			},
		});

		return likes;
	} catch (error) {
		console.error('Error getting likes:', error);
		return [];
	}
}

export async function addLike(userId: string, postId: string) {
	try {
		const like = await prisma.like.create({
			data: {
				id: randomUUID(),
				userId: userId,
				postId: postId,
			},
		});

		return like;
	} catch (error) {
		console.error('Error adding like:', error);
		return null;
	}
}

export async function removeLike(id: string) {
	try {
		await prisma.like.deleteMany({
			where: {
				id,
			},
		});

		return true;
	} catch (error) {
		console.error('Error removing like:', error);
		return false;
	}
}
