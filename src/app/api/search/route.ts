import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")?.toLowerCase() || "";

    const posts = await prisma.$queryRaw`
        SELECT
            p.id, p.title, p.content, p.category, p.createdAt, u.nickname as author
        FROM
            post p
        JOIN
            user u ON p.authorId = u.id
        WHERE
            MATCH(p.title, p.content) AGAINST (${query} IN NATURAL LANGUAGE MODE)
        ORDER BY
            p.createdAt DESC;
    `;

    const result = posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        createdAt: post.createdAt,
        author: post.author,
    }));

    return NextResponse.json(result);
}
