// app/api/post/[id]/like/route.ts
import { NextResponse } from "next/server";
import prisma from "@/generated/prisma"; // prisma 클라이언트 경로를 프로젝트에 맞게 수정하세요

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    // params를 await해서 id 값을 가져옵니다
    const { id: idStr } = await context.params;
    const postId = Number(idStr);

    if (isNaN(postId)) {
        return NextResponse.json(
            { error: "잘못된 게시글 ID입니다." },
            { status: 400 }
        );
    }

    try {
        // likeCount를 1 증가시킵니다
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { likeCount: { increment: 1 } },
        });
        return NextResponse.json({ likeCount: updated.likeCount });
    } catch (error) {
        console.error("좋아요 업데이트 실패:", error);
        return NextResponse.json(
            { error: "좋아요 업데이트 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
