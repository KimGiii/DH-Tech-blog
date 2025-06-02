import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        return NextResponse.json(
            { message: "유효하지 않은 ID입니다." },
            { status: 400 }
        );
    }

    try {
        // id로 한 건만 조회
        const post = await prisma.post.findUnique({
            where: { id: numericId },
            include: {
                author: {
                    select: { name: true },
                },
            },
        });

        if (!post) {
            return NextResponse.json(
                { message: `게시글(id: ${numericId})이 존재하지 않습니다.` },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "게시글을 불러오는 중 서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
