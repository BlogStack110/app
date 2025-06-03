'use client';
import { Calendar, Heart, MessageCircle, TagIcon } from 'lucide-react';
import { featuredBlog, RelatedPosts, BlogData } from '@/types/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BlogCard({ blog }: { blog: featuredBlog }) {
	const router = useRouter();
	return (
		<Link
			key={blog.id}
			href={`/blog/${blog.id}`}
			className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
		>
			<div className="aspect-video relative overflow-hidden">
				{blog.imgUrl ? (
					<Image
						width={1000}
						height={1000}
						src={blog.imgUrl}
						alt={blog.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
						<div className="text-center">
							<h3 className="text-lg font-medium text-white/80 px-4">
								{blog.title}
							</h3>
						</div>
					</div>
				)}
			</div>
			<div className="p-4">
				<h3 className="font-medium mb-2 line-clamp-2">{blog.title}</h3>
				<div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
					<div className="flex items-center">
						<Image
							width={1000}
							height={1000}
							src={blog.authorImgUrl || 'https://dummyimage.com/100x100'}
							alt={blog.author.name || 'Author'}
							className="w-6 h-6 rounded-full mr-2"
						/>
						<span>{blog.author.name}</span>
					</div>
					<div className="flex items-center">
						<Calendar className="w-4 h-4 mr-1" />
					</div>
					<div className="flex items-center">
						<Heart className="w-4 h-4 mr-1" />
						<span>{blog._count.likes}</span>
					</div>
					<div className="flex items-center">
						<MessageCircle className="w-4 h-4 mr-1" />
						<span>{blog._count.comments}</span>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					{blog.tags.slice(0, 3).map((tag: string, index: number) => (
						<div onClick={() => {
							router.push(`/blog/tag/${tag}`);
						}} key={index}>
							<span
								key={index}
								className="flex items-center px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-lg"
							>
								<TagIcon className="w-3 h-3 mr-1" />
								{tag}
							</span>
						</div>
					))}
				</div>
			</div>
		</Link>
	);
}
