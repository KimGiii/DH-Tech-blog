import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

// GET all posts (with optional search)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const category = searchParams.get("category");

        const posts = await prisma.post.findMany({
            where: {
                ...(search
                    ? {
                        OR: [
                            { title: { contains: search, mode: "insensitive" } },
                            { content: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {}),
                ...(category
                    ? { category: category.toUpperCase() }
                    : {}),
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                author: true,
                content: true,
                category: true,
                createdAt: true,
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
    }
}

// Create a new post
export async function POST(req: NextRequest) {
    try {
        const { title, content, category, authorId } = await req.json();

        // 1) User가 실제로 존재하는지 문자열 ID로 확인
        const existingUser = await prisma.user.findUnique({
            where: { id: String(authorId) },
        });
        if (!existingUser) {
            return NextResponse.json(
                { message: `User(id=${authorId}) not found` },
                { status: 400 }
            );
        }

        // 2) User가 존재할 때만 Post 생성
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                category,
                author: {
                    connect: { id: String(authorId) },
                },
            },
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating post" }, { status: 500 });
    }
}

// Update a post
export async function PUT(req: NextRequest) {
    try {
        const { id, title, content } = await req.json();
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content },
        });
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ message: "Error updating post" }, { status: 500 });
    }
}

// Delete a post
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await prisma.post.delete({ where: { id } });
        return NextResponse.json({ message: "Post deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
    }
}
