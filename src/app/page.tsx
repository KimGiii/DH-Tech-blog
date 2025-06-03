"use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: { nickname: string };
  createdAt: string;
}

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"latest" | "byCategory">("latest");
    const [selectedTab, setSelectedTab] = useState<"javascript" | "typescript" | "react" | "etc">("javascript");
    const [latestPosts, setLatestPosts] = useState<Record<string, Post | null>>({
      js: null,
      ts: null,
      react: null,
      etc: null,
    });

    const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);

    useEffect(() => {
      if (viewMode === "byCategory") {
        const fetchCategoryPosts = async () => {
          const res = await fetch(`/api/post?category=${selectedTab.toUpperCase()}`);
          const posts: Post[] = await res.json();
          setCategoryPosts(posts);
        };
        fetchCategoryPosts();
      }
    }, [viewMode, selectedTab]);

    useEffect(() => {
      const fetchLatestPosts = async () => {
        const slugs = ['javascript', 'typescript', 'react', 'etc'];
        const latest: Record<string, Post | null> = {
          js: null,
          ts: null,
          react: null,
          etc: null,
        };
        for (const slug of slugs) {
          const res = await fetch(`/api/post?category=${slug.toUpperCase()}`);
          const posts: Post[] = await res.json();
          if (posts.length > 0) {
            latest[slug] = posts[0];
          }
        }
        setLatestPosts(latest);
      };
      fetchLatestPosts();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
    };
    console.log("session", session);

    const categories = [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Etc", slug: "etc" },
    ];

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setViewMode("latest")}
            className={`px-4 py-2 -mb-px ${
              viewMode === "latest"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            최신 글
          </button>
          <button
            onClick={() => setViewMode("byCategory")}
            className={`px-4 py-2 -mb-px ${
              viewMode === "byCategory"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            카테고리별 보기
          </button>
            <form onSubmit={handleSearch} className="flex items-center ml-auto gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="검색어 입력"
                    className="border rounded px-2 py-1"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                    검색
                </button>
            </form>
        </div>

        {viewMode === "latest" && (
          <>
            <h1 className="text-2xl font-bold mb-6">📢 최신 기술 글</h1>
            <div className="space-y-10">
              {categories.map(({ name, slug }) => {
                const post = latestPosts[slug];
                return (
                  <section key={slug}>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">{name}</h2>
                    {post ? (
                      <Link href={`/category/${slug}/${post.id}`} className="block hover:underline">
                        <div className="text-lg font-medium">{post.title}</div>
                        <p className="text-sm text-gray-500">
                          by {post.author.nickname} · {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-500">게시글 없음</p>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}

        {viewMode === "byCategory" && (
          <>
            <div className="flex border-b border-gray-300 mb-6">
              <button
                onClick={() => setSelectedTab("javascript")}
                className={`px-4 py-2 -mb-px ${
                  selectedTab === "javascript"
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setSelectedTab("typescript")}
                className={`px-4 py-2 -mb-px ${
                  selectedTab === "typescript"
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                TypeScript
              </button>
              <button
                onClick={() => setSelectedTab("react")}
                className={`px-4 py-2 -mb-px ${
                  selectedTab === "react"
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                React
              </button>
              <button
                onClick={() => setSelectedTab("etc")}
                className={`px-4 py-2 -mb-px ${
                  selectedTab === "etc"
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                Etc
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-6">📢 {categories.find(c => c.slug === selectedTab)?.name} 글 목록</h1>
            <div className="space-y-10">
              <section>
                {categoryPosts.length > 0 ? (
                  <div className="space-y-6">
                    {categoryPosts.map(post => (
                      <Link
                        key={post.id}
                        href={`/category/${selectedTab === "javascript" ? "js" : selectedTab === "typescript" ? "ts" : selectedTab}/${post.id}`}
                        className="block hover:underline"
                      >
                        <div className="text-lg font-medium">{post.title}</div>
                        <p className="text-sm text-gray-500">
                            by {post.author.name} · {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">게시글 없음</p>
                )}
              </section>
            </div>
          </>
        )}
      </main>
    );
}
