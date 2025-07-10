import { Post } from "@/app/generated/prisma";
import { z } from "zod";
export interface BlogData {
	id: string;
	title: string;
	content: string;
	description?: string; //for short glimpse of the content
	authorId: string;
	authorImgUrl: string;
	publishDate: Date;
	tags: string[];
	imgUrl: string;
	author: {
		name: string;
	};
	comments: {
		id: string;
		user: {
			id: string;
			name: string;
			image: string | null;
		};
		comment: string;
		commentedAt: Date;
	}[];
	likes: {}[];
}
export interface RelatedPosts {
	id: string;
	title: string;
	authorId: string;
	authorImgUrl: string;
	publishDate: Date;
	tags: string[];
	imgUrl: string;
	likes: {}[];
	author: {
		name: string;
	};
}

export interface DashboardBlogData {
	authorName: string;
	title: string;
	authorId: string;
	content: string;
	publishDate: Date;
	comments: number;
	views: number;
	tags: string[];
	likes: number;
	id: string;
	likeCount: number;
	imgUrl: string;
	authorImgUrl: string;
	bookmarked: boolean;
	deleteable?: boolean;
}

export interface featuredBlog {
	author: {
		name: string;
		image: string | null;
	};
	_count: {
		comments: number;
		likes: number;
		views: number;
	};
	id: string;
	title: string;
	content: string;
	published: boolean;
	authorId: string;
	authorImgUrl: string;
	publishDate: string;
	tags: string[];
	imgUrl: string;
}


export interface PostWithAuthor extends Post {
	author: {
		name: string | null;
		pfpUrl: string | null;
	};
	_count: {
		likes: number;
		comments: number;
		views: number;
	};
}



export interface DashboardData {
	status: string;
	body: {
		posts: number;
		bookmarks: number;
		joinedOn: Date;
		blogs: PostWithAuthor[];
		pagination: {
			currentPage: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPrevPage: boolean;
		};
	};
}



export interface PublishPayload {
	title?: string;
	content?: string;
	tags?: string[];
	imgUrl?: string;
}

export interface PublishResponse {
	errors?: {
		title?: string[] | null;
		content?: string | null;
		tags?: string | null;
	};
	values?: {
		title?: string[];
		content?: string;
		tags?: string;
		imgUrl?: string;
	};
}



export const PublishPayloadType = z.object({
	title: z.string().min(3, "Title must be over 3 characters").max(100, "Title must be under 100 characters"),
	content: z.string().min(10, "Content must be over 10 characters"),
	tags: z.array(z.string()).min(1, "At least one tag is required"),
	imgUrl: z.string().optional()
})

