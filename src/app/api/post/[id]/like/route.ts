import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();
export default prisma;

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    // 1) params를 await해서 id 문자열을 꺼냅니다.
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
        // 3) likeCount를 1 증가
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { likeCount: { increment: 1 } },
        });

        // 4) 클라이언트에 최신 likeCount만 리턴
        return NextResponse.json({ likeCount: updated.likeCount });
    } catch (error) {
        console.error("좋아요 업데이트 실패:", error);
        // 실제로 발생한 오류 메시지를 콘솔에 찍어보고,
        // err instanceof Prisma.PrismaClientKnownRequestError 같은 식으로 세부 에러를 더 파악해 보세요.
        return NextResponse.json(
            { error: "좋아요 업데이트 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
