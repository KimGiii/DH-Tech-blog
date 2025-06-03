// src/app/api/post/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

// GET /api/post/[id]
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: numericId },
            include: { author: { select: { id: true, name: true } } },
        });
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
    }
}

// PUT /api/post/[id]
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { title, content, category } = await request.json();
    try {
        const updated = await prisma.post.update({
            where: { id: numericId },
            data: { title, content, category },
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: "Error updating post" }, { status: 500 });
    }
}

// DELETE /api/post/[id]
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        await prisma.post.delete({ where: { id: numericId } });
        return NextResponse.json({ message: "Post deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
    }
}
