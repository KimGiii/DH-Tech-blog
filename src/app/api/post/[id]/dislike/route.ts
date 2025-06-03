// app/api/post/[id]/dislike/route.ts
import { NextResponse } from "next/server";
import prisma from "@/generated/prisma"; // prisma 클라이언트를 불러오는 경로를 프로젝트에 맞게 수정하세요

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const postId = Number(params.id);
    if (isNaN(postId)) {
        return NextResponse.json(
            { error: "잘못된 게시글 ID입니다." },
            { status: 400 }
        );
    }

    try {
        // dislikeCount 1 증가
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { dislikeCount: { increment: 1 } },
        });
        return NextResponse.json({ dislikeCount: updated.dislikeCount });
    } catch (error) {
        console.error("싫어요 업데이트 실패:", error);
        return NextResponse.json(
            { error: "싫어요 업데이트 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
