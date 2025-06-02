import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function JavaScriptCategoryPage() {
    const posts = await prisma.post.findMany({
        where: { category: "etc" },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            author: true,
            createdAt: true,
        },
    });

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">📂 etc 게시글</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link href={`/posts/${post.id}`}>
                            <div className="text-xl font-semibold hover:underline">{post.title}</div>
                            <p className="text-sm text-gray-500 mt-1">
                                by <span className="font-medium">{post.author}</span> · {post.createdAt.toISOString().split("T")[0]}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
