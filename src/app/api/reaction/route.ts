import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/generated/prisma";

// 좋아요/싫어요 저장 또는 업데이트
export async function POST(req: NextRequest) {
    try {
        const { userId, postId, type } = await req.json();

        if (!userId || !postId || !type) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existing = await prisma.postReaction.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existing) {
            // 이미 반응이 존재하면 업데이트
            const updated = await prisma.postReaction.update({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
                data: { type },
            });
            return NextResponse.json(updated);
        } else {
            // 새 반응 생성
            const created = await prisma.postReaction.create({
                data: {
                    userId,
                    postId,
                    type,
                },
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        console.error("POST /api/reaction error:", error);
        return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
    }
}

// 게시글의 좋아요/싫어요 개수 조회
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    try {
        const postId = Number(id);

        if (isNaN(postId)) {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }

        const reactions = await prisma.postReaction.groupBy({
            by: ["type"],
            where: { postId },
            _count: true,
        });

        // 기본값 포함해 응답 생성
        const result = {
            LIKE: 0,
            DISLIKE: 0,
            ...Object.fromEntries(reactions.map((r) => [r.type, r._count])),
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error("GET /api/reaction error:", error);
        return NextResponse.json({ error: "Failed to fetch reactions" }, { status: 500 });
    }
}
