import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/utils/prismaClient"; // 클라이언트 가져오기

// GET all posts
export async function GET() {
    try {
        const post = await prisma.post.findMany({
            orderBy: {createdAt: "desc"},
            select: {
                id: true,
                title: true,
                author: true,
                content: true,
                createdAt: true,
            },
        });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({message: "Error fetching posts"}, {status: 500});
    }
}

// Create a new post
export async function POST(req: NextRequest) {
    try {
        const {title, content, authorId, category} = await req.json();
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                category,
                author: {
                    connect: { id: authorId },
                },
            },
        });
        return NextResponse.json(newPost, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error creating post"}, {status: 500});
    }
}

// Update a post
export async function PUT(req: NextRequest) {
    try {
        const {id, title, content} = await req.json();
        const updatedPost = await prisma.post.update({
            where: {id},
            data: {title, content},
        });
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({message: "Error updating post"}, {status: 500});
    }
}

// Delete a post
export async function DELETE(req: NextRequest) {
    try {
        const {id} = await req.json();
        await prisma.post.delete({where: {id}});
        return NextResponse.json({message: "Post deleted"});
    } catch (error) {
        return NextResponse.json({message: "Error deleting post"}, {status: 500});
    }
}
