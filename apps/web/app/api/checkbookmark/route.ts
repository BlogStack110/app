import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
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
    // Check if a bookmark exists for this user and post
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        postId,
        userId,
      },
    });

    return NextResponse.json({ isBookmarked: !!bookmark });
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return NextResponse.json(
      { error: "Error checking bookmark status" },
      { status: 500 }
    );
  }
}
