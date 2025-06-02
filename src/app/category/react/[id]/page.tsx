import Link from "next/link";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    author?: {
        nickname: string;
    };
    createdAt: string;
    updatedAt?: string;
    likeCount?: number;
    dislikeCount?: number;
}

async function getPostById(id: string): Promise<Post> {
    const res = await fetch(`http://localhost:3000/api/post/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error("게시글을 불러오는 데 실패했습니다");
    }
    return res.json();
}

interface Props {
    params: {
        id: string;
    };
}

export default async function PostDetailPage({ params }: Props) {
    const post = await getPostById(params.id);

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <article className="prose mx-auto">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-6">
                    by <span className="font-medium">{post.author?.nickname || "Unknown"}</span> ·{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="mb-6">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
            {post.category}
          </span>
                </div>
                <div className="mt-4">
                    <p>{post.content}</p>
                </div>
                <LikeDislikeButtons postId={post.id} initialLikes={post.likeCount || 0} initialDislikes={ post.dislikeCount || 0} />
            </article>
            <div className="mt-8">
                <Link href="/category/js" className="text-blue-600 hover:underline">
                    ← 뒤로 가기
                </Link>
            </div>
        </main>
    );
}
