"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [emailQuery, setEmailQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

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
    <main className="max-w-4xl mx-auto p-8 space-y-10">

        <section>
          <h2 className="text-xl font-bold mb-4">📝 게시물 관리</h2>
          <div className="flex gap-4">
            <Link href="/admin/post/create" className="btn">쓰기</Link>
            <Link href="/admin/post/edit" className="btn">수정</Link>
            <Link href="/admin/post/delete" className="btn">삭제</Link>
          </div>
          <div className="border border-white text-white p-4 rounded mt-4">
            <p>게시물 목록</p>
            {postLoading ? (
              <p>로딩 중...</p>
            ) : (
              <ul className="list-disc pl-5 mt-2">
                  {posts.map((post, index) => (
                      <li key={post.id || index}>
                          {String(post.title)} ({String(post.author?.name)}) - 작성일: {new Date(post.createdAt).toLocaleDateString()}
                      </li>
                  ))}
              </ul>
            )}
          </div>
        </section>


      <section>
        <h2 className="text-xl font-bold mb-4">👤 회원 관리</h2>
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="이메일로 검색"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="닉네임으로 검색"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="border px-4 py-2 rounded"
          />
        </div>
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
    </main>
  );
}
