'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DashboardData } from '@/types/blogs';
import { headers } from 'next/headers';


export async function getDashboardData(page: number): Promise<DashboardData> {
	try {

		const session = await auth.api.getSession({
			headers: await headers()
		})
		const userId = session?.user.id
		const limit = 8;
		const skip = (page - 1) * limit;

		const [currUser, totalPosts, posts] = await Promise.all([
			prisma.user.findFirst({
				where: { id: userId ?? "" },
				select: {
					posts: true,
					bookmarks: true,
					joinedOn: true,
				},
			}),
			prisma.post.count(),
			prisma.post.findMany({
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
				posts: currUser?.posts?.length ?? 0,
				bookmarks: currUser?.bookmarks?.length ?? 0,
				joinedOn: currUser?.joinedOn ?? new Date(),
				blogs: posts,
				pagination: {
					currentPage: page,
					totalPages,
					hasNextPage: page < totalPages,
					hasPrevPage: page > 1,
				},
			},
		};
	} catch (error) {
		console.error("Error loading dashboard:", error);
		return {
			status: "error",
			body: {
				posts: 0,
				bookmarks: 0,
				joinedOn: new Date(),
				blogs: [],
				pagination: {
					currentPage: 1,
					totalPages: 1,
					hasNextPage: false,
					hasPrevPage: false,
				},
			},
		};
	}
}

// Alternative: If you need to handle form data or search params
export async function getDashboardDataWithSearchParams(formData: FormData): Promise<DashboardData> {
	const page = parseInt(formData.get("page") as string || "1");
	return getDashboardData(page);
}
