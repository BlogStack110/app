import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  if (!postId || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // Check if a like exists for this user and post
    const like = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    return NextResponse.json({ isLiked: !!like });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: "Error checking like status" },
      { status: 500 }
    );
  }
}
