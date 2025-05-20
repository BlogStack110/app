import {prisma} from '../../lib/db';
import {BlogData, RelatedPosts} from '../../types/blogs';
export const getFeaturedBlogs = async () => {
	const blogs = await prisma.post.findMany({
		take: 6,
		orderBy: {
			publishDate: 'desc',
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
export const getBlogDetails = async (id: string) => {
	const blog = await prisma.post.findFirst({
		where: {
			id,
		},
		select: {
			id: true,
			tags: true,
			title: true,
			content: true,
			authorId: true,
			imgUrl: true,
			likes: true,
			publishDate: true,
			authorImgUrl: true,
			author: {
				select: {
					name: true,
				},
			},
			comments: {
				where: {
					postId: id,
				},
				orderBy: {
					commentedAt: 'desc',
				},
				select: {
					comment: true,
					commentedAt: true,
					id: true,
					user: {
						select: {
							name: true,
							pfpUrl: true,
							id: true,
						},
					},
				},
			},
		},
	});

	// Get related posts
	const relatedPosts: RelatedPosts[] = await prisma.post.findMany({
		where: {
			id: {
				not: id,
			},
			tags: {
				hasSome: blog?.tags || [],
			},
		},
		take: 3,
		select: {
			id: true,
			authorId: true,
			title: true,
			imgUrl: true,
			publishDate: true,
			authorImgUrl: true,
			likes: true,
			tags: true,
			author: {
				select: {
					name: true,
				},
			},
		},
	});

	// Create a truncated description from the content
	const description = blog?.content
		? blog.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...'
		: '';
	if (blog) {
		const response: {
			blog: BlogData;
			relatedPosts: RelatedPosts[];
			description: string;
		} = {blog, relatedPosts, description};
		return response;
	}
};
