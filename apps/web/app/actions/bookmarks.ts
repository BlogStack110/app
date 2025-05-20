'use server';
import {prisma} from '@/lib/db';
import {randomUUID} from 'node:crypto';

export async function getBookmarks(userId: string) {
	try {
		const bookmarks = await prisma.bookmark.findMany({
			where: {
				userId: userId,
			},
		});

		return bookmarks;
	} catch (error) {
		console.error('Error getting bookmarks:', error);
		return [];
	}
}

export async function addBookmark(userId: string, postId: string) {
	try {
		const bookmark = await prisma.bookmark.create({
			data: {
				id: randomUUID(),
				userId: userId,
				postId: postId,
			},
		});

		return bookmark;
	} catch (error) {
		console.error('Error adding bookmark:', error);
		return null;
	}
}

export async function removeBookmark(id: string) {
	try {
		await prisma.bookmark.delete({
			where: {
				id,
			},
		});
		return true;
	} catch (error) {
		console.error('Error removing bookmark:', error);
		return false;
	}
}
