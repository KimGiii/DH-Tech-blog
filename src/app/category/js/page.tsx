import Link from "next/link";

async function getPosts() {
    const res = await fetch("http://localhost:3000/api/post?category=JAVASCRIPT", {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error("게시글을 불러오는 데 실패했습니다");
    }
    return res.json();
}

export default async function JavaScriptCategoryPage() {
    const posts = await getPosts();

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">📂 JavaScript 게시글</h1>
            <ul className="space-y-6">
                {posts.map((post: any) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link href={`/posts/${post.id}`}>
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
