import Link from "next/link";

function mapToCategory(category: string): string {
    switch (category.toLowerCase()) {
        case 'js':
            return 'JAVASCRIPT';
        case 'ts':
            return 'TYPESCRIPT';
        case 'react':
            return 'REACT';
        case 'etc':
            return 'ETC';
        default:
            throw new Error(`Unknown category: ${category}`);
    }
}

async function getPosts(category: string) {
    const res = await fetch(`http://localhost:3000/api/post?category=${mapToCategory(category)}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error("게시글을 불러오는 데 실패했습니다");
    }
    return res.json();
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const posts = await getPosts(params.category);

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">📂 {params.category} 게시글</h1>
            <ul className="space-y-6">
                {posts.map((post: any) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link href={`/category/${params.category}/${post.id}`}>
                            <div className="text-xl font-semibold hover:underline">{post.title}</div>
                            <p className="text-sm text-gray-500 mt-1">
                                by <span className="font-medium">{post.author?.nickname || "Unknown"}</span> ·{" "}
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
