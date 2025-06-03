// src/app/api/post/[id]/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET: 단일 게시글 조회
 * URL: GET /api/post/[id]
 */
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const postId = Number(params.id);

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json(
                { message: "게시글을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (err) {
        return NextResponse.json(
            { message: "게시글 조회 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

/**
 * PUT: 단일 게시글 수정
 * URL: PUT /api/post/[id]
 */
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const postId = Number(params.id);
    const { title, content, category } = await req.json();

    try {
        const updated = await prisma.post.update({
            where: { id: postId },
            data: { title, content, category },
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json(
            { message: "수정에 실패했습니다." },
            { status: 500 }
        );
    }
}

/**
 * DELETE: 단일 게시글 삭제
 * URL: DELETE /api/post/[id]
 */
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const postId = Number(params.id);

    try {
        await prisma.post.delete({ where: { id: postId } });
        return NextResponse.json({ message: "삭제 성공" });
    } catch (error) {
        return NextResponse.json(
            { message: "삭제에 실패했습니다." },
            { status: 500 }
        );
    }
}
