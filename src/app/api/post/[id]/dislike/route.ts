import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    // 1) params를 await해서 id 문자열을 가져옵니다.
    const { id: idStr } = await context.params;
    // 2) 숫자로 변환
    const postId = Number(idStr);

    if (isNaN(postId)) {
        return NextResponse.json(
            { error: "잘못된 게시글 ID입니다." },
            { status: 400 }
        );
    }

    try {
        // 3) dislikeCount를 1 증가
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { dislikeCount: { increment: 1 } },
        });

        // 4) 최신 dislikeCount를 클라이언트로 반환
        return NextResponse.json({ dislikeCount: updated.dislikeCount });
    } catch (error) {
        console.error("싫어요 업데이트 실패:", error);
        return NextResponse.json(
            { error: "싫어요 업데이트 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
