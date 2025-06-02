"use client"

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    return (
        <>
            <div className="w-full flex justify-end px-4 pt-4 gap-2">
                {session?.user ? (
                    <>
                        <Link
                            href="/me"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            내 정보 보기
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        로그인
                    </Link>
                )}
            </div>
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* 상단 네비게이션은 layout.tsx에 분리해두는 것을 권장 */}

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
                  <section>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">JavaScript</h2>
                    <Link href="/posts/1" className="block hover:underline">
                      <div className="text-lg font-medium">자바스크립트 비동기 처리 완전 정복</div>
                      <p className="text-sm text-gray-500">by 홍길동 · 2024.05.30</p>
                    </Link>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">TypeScript</h2>
                    <Link href="/posts/2" className="block hover:underline">
                      <div className="text-lg font-medium">타입스크립트 유틸리티 타입 완전 정복</div>
                      <p className="text-sm text-gray-500">by 김개발 · 2024.05.29</p>
                    </Link>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">React</h2>
                    <Link href="/posts/3" className="block hover:underline">
                      <div className="text-lg font-medium">React Server Components 이해하기</div>
                      <p className="text-sm text-gray-500">by 리액터 · 2024.05.28</p>
                    </Link>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">Etc</h2>
                    <Link href="/posts/4" className="block hover:underline">
                      <div className="text-lg font-medium">개발자를 위한 Git 꿀팁</div>
                      <p className="text-sm text-gray-500">by 도구왕 · 2024.05.27</p>
                    </Link>
                  </section>
                </div>
            </main>
        </>
    );
}
