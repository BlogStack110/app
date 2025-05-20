import {getBlogDetails} from '@/app/api/blogs';
import Blog from '@/components/Blog';

export default async function Page({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;
	const blogDetails = await getBlogDetails(id);
	const blog = blogDetails?.blog;
	const handleCommentSubmit = () => {};
	return (
		<Blog
			id={blog?.id ?? ''}
			title={blog?.title ?? ''}
			content={blog?.content ?? ''}
			authorId={blog?.authorId ?? ''}
			authorImgUrl={blog?.authorImgUrl ?? ''}
			publishDate={blog?.publishDate ?? ''}
			tags={blog?.tags ?? []}
			imgUrl={blog?.imgUrl ?? ''}
			author={{name: blog?.author.name ?? ''}}
			comments={blog?.comments ?? []}
			likes={blog?.likes ?? []}
		/>
	);
}

// function stripHtml(html: string): string {
//   // Check if we're in the browser environment
//   if (typeof document !== "undefined") {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
//   }
//
//   // Server-side fallback - simple regex to strip HTML tags
//   return html.replace(/<[^>]*>?/gm, "");
//
