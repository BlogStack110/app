import { getBlogDetails } from '@/app/api/blogs';
import Blog from '@/components/Blog';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const blogDetails = await getBlogDetails(id);
	const blog = blogDetails?.blog;
	const relatedPosts = blogDetails?.relatedPosts;
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


