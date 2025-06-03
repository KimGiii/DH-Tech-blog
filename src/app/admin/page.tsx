"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [searchType, setSearchType] = useState<"email" | "name">("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"posts" | "users">("posts");

  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === "email") {
      router.push(`/admin/users/search?email=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/admin/users/search?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex border-b border-white mb-6">
        <button
          onClick={() => setSelectedTab("posts")}
          className={`px-4 py-2 -mb-px ${
            selectedTab === "posts"
              ? "border-b-2 border-white font-semibold"
              : "text-gray-400"
          }`}
        >
          게시물 관리
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`px-4 py-2 -mb-px ${
            selectedTab === "users"
              ? "border-b-2 border-white font-semibold"
              : "text-gray-400"
          }`}
        >
          회원 관리
        </button>
      </div>

      {selectedTab === "posts" && (
        <section>
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-4">📝 게시물 관리</h2>
            <Link href="/admin/post/create" className="btn">게시물 작성</Link>
          </div>
          <div className="border border-white text-white p-4 rounded mt-4">
            {postLoading ? (
              <p>로딩 중...</p>
            ) : (
              <ul className="list-disc pl-5 mt-2">
                  {posts.map((post, index) => (
                      <li key={post.id || index}>
                          <Link href={`/admin/post/edit/${post.id}`} className="font-medium text-blue-500 hover:underline">
                            {String(post.title)}
                          </Link>{" "}
                          [{String(post.category)}] ({String(post.author?.name)}) - 작성일: {new Date(post.createdAt).toLocaleDateString()}
                      </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {selectedTab === "users" && (
        <section>
          <h2 className="text-xl font-bold mb-4">👤 회원 관리</h2>
          <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "email" | "name")}
              className="border px-4 py-2 rounded bg-gray-800"
            >
              <option value="email">이메일</option>
              <option value="name">닉네임</option>
            </select>
            <input
              type="text"
              placeholder="회원 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-4 py-2 rounded flex-1"
            />
            <button type="submit" className="btn">
              검색
            </button>
          </form>
          <div className="border border-white text-white p-4 rounded">
            <p>회원 목록</p>
            {loading ? (
              <p>로딩 중...</p>
            ) : (
              <ul className="list-disc pl-5 mt-2">
                {users.map((user) => (
                  <li key={user.id}>
                    {String(user.email)} ({String(user.name)}) - 가입일: {new Date(user.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
