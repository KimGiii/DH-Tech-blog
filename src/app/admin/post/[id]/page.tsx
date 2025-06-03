"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// (재사용 가능한 Post 인터페이스가 있다면 import하거나, 아래와 같이 정의)
interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author?: { nickname: string };
  createdAt: string;
}

export default function AdminPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/post/${id}`);
      if (res.ok) {
        setPost(await res.json());
      }
    }
    load();
  }, [id]);

  async function handleDelete() {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/post/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin"); // 삭제 후 관리 메인으로 이동
    } else {
      alert("삭제에 실패했습니다.");
    }
  }

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
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
      <div className="mt-4 mb-8">
        <p>{post.content}</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <Link
          href={`/admin/post/edit/${id}`}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          수정하기
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          삭제하기
        </button>
      </div>

      <Link href="/admin" className="text-blue-600 hover:underline">
        ← 뒤로 관리 페이지
      </Link>
    </main>
  );
}
