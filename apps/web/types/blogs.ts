import { any } from 'better-auth';

export interface BlogData {
	id: string;
	title: string;
	content: string;
	description?: string; //for short glimpse of the content
	authorId: string;
	authorImgUrl: string;
	publishDate: string;
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
			pfpUrl: string | null;
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
	publishDate: string;
	tags: string[];
	imgUrl: string;
	likes: {}[];
	author: {
		name: string;
	};
}


export interface featuredBlog {
	author: {
		name: string;
		pfpUrl: string | null;
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

