import { getBlogDetails } from '@/app/api/blogs';
import Blog from '@/components/Blog';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const blogDetails = await getBlogDetails(id);
	const blog = blogDetails?.blog;
	const relatedPosts = blogDetails?.relatedPosts;
	// const handleCommentSubmit = () => {};
	return (
		<>
			<PublicNavbar />
			<Blog
				blog={blog}
				relatedPosts={relatedPosts}
			/>
			<PublicFooter />
		</>
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
