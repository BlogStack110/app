
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
	publishDate: string;
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
	publishDate: string;
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

