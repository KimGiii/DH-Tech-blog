"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadPost() {
      const res = await fetch(`/api/post/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
        router.back();
      }
    }
    loadPost();
  }, [postId, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const err = await res.json();
        alert(err.message || "수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    }
  }

  async function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  }

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="TYPESCRIPT">TypeScript</option>
            <option value="REACT">React</option>
            <option value="ETC">Etc</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded h-48"
            required
          />
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            수정 완료
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-4"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-auto"
          >
            삭제하기
          </button>
        </div>
      </form>
    </main>
  );
}
