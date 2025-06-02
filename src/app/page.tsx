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
    const [latestPosts, setLatestPosts] = useState<Record<string, Post | null>>({
      js: null,
      ts: null,
      react: null,
      etc: null,
    });

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
                <div className="mb-6 flex gap-4 border-b pb-2">
                    <Link href="/category/js" className="text-blue-600 hover:underline">
                        JavaScript
                    </Link>
                    <Link href="/category/ts" className="text-blue-600 hover:underline">
                        TypeScript
                    </Link>
                    <Link href="/category/react" className="text-blue-600 hover:underline">
                        React
                    </Link>
                    <Link href="/category/etc" className="text-blue-600 hover:underline">
                        Etc
                    </Link>
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
                              by {post.author.nickname} · {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </Link>
                        ) : (
                          <p className="text-sm text-gray-500">게시글 없음</p>
                        )}
                      </section>
                    );
                  })}
                </div>
            </main>
    );
}
