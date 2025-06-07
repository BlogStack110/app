"use server";
import { authClient } from "@/lib/auth-client";
import { prisma } from "@/lib/db";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await authClient.getSession();
	const userId = session.data?.user.id
	const url = new URL(context.req.url || '', `http://${context.req.headers.host}`);
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = 8;
	const skip = (page - 1) * limit;

	try {
		const [currUser, totalPosts, posts] = await Promise.all([
			prisma.user.findFirst({
				where: { id: userId ?? '' },
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
				orderBy: { publishDate: 'desc' },
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
			props: {
				status: 'success',
				body: {
					posts: currUser?.posts?.length ?? 0,
					bookmarks: currUser?.bookmarks?.length ?? 0,
					joinedOn: currUser?.joinedOn?.toISOString() ?? new Date().toISOString(),
					blogs: posts.map(post => ({
						...post,
						publishDate: post.publishDate.toString()
					})),
					pagination: {
						currentPage: page,
						totalPages,
						hasNextPage: page < totalPages,
						hasPrevPage: page > 1,
					},
				},
				user: {
					firstName: session.data?.user.name || null,
					username: session.data?.user.email.split("@")[0] || null,
				}
			},
		};
	} catch (error) {
		console.error('Error loading dashboard:', error);
		return {
			props: {
				status: 'error',
				body: {
					posts: 0,
					bookmarks: 0,
					joinedOn: new Date().toISOString(),
					blogs: [],
					pagination: {
						currentPage: 1,
						totalPages: 1,
						hasNextPage: false,
						hasPrevPage: false,
					},
				},
				user: {
					firstName: null,
					username: null,
				}
			},
		};
	}
}


