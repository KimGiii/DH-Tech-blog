"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [authorId] = useState(1); // example user ID
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/post", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ title, content, category, authorId }),
            });
            if (res.ok) {
                router.push("/admin");
            } else {
                const data = await res.json();
                alert(data.message || "게시글 생성 실패");
            }
        } catch (err) {
            alert("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <div>
                    <p className="font-medium mb-2">카테고리 선택</p>
                    <div className="flex gap-2">
                        {["JAVASCRIPT", "TYPESCRIPT", "REACT", "ETC"].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-1 rounded border ${
                                    category === cat
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-black border-gray-300"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    rows={6}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "작성 중..." : "작성하기"}
                </button>
            </form>
        </main>
    );
}
