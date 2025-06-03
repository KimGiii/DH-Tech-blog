// app/api/post/[id]/like/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const postId = Number(params.id);
    if (Number.isNaN(postId)) {
        return NextResponse.json({ error: "유효하지 않은 게시글 ID입니다." }, { status: 400 });
    }

    try {
        // 현재 카운트를 1 증가시키고, 업데이트된 값을 반환
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { likeCount: { increment: 1 } },
            select: { likeCount: true, dislikeCount: true },
        });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("좋아요 처리 중 오류:", error);
        return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
    }
}
