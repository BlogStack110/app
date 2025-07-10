import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const payload = await req.json();

		// Validate payload structure
		if (!payload || typeof payload !== 'object') {
			return NextResponse.json(
				{ error: 'Invalid payload' },
				{ status: 400 }
			);
		}

		// Get session
		const session = await auth.api.getSession({
			headers: await headers()
		});

		// Check if user is authenticated
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: 'Unauthorized - please log in' },
				{ status: 401 }
			);
		}

		// Validate required fields
		if (!payload.title || !payload.content) {
			return NextResponse.json(
				{ error: 'Title and content are required' },
				{ status: 400 }
			);
		}

		// Create the post
		const post = await prisma.post.create({
			data: {
				title: payload.title,
				content: payload.content,
				imgUrl: payload.imgUrl || "",
				tags: Array.isArray(payload.tags) ? payload.tags : [],
				authorId: session.user.id,
				authorImgUrl: session.user.image || "",
			},
		});

		return NextResponse.json(
			{ message: 'Blog post published successfully', postId: post.id },
			{ status: 200 }
		)

	} catch (error) {
		console.error("Error publishing blog post:", error);



		return NextResponse.json(
			{ error: 'Failed to publish blog post' },
			{ status: 500 }
		);
	}
}
