"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function UserSearchPage() {
    const searchParams = useSearchParams();
    const emailQuery = searchParams.get("email") || "";
    const nameQuery = searchParams.get("name") || "";

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilterUsers = async () => {
            try {
                const res = await fetch("/api/users");
                if (!res.ok) {
                    console.error("회원 데이터를 불러오지 못했습니다.");
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                const filtered = data.filter((user: any) => {
                    const matchesEmail = emailQuery ? user.email?.includes(emailQuery) : true;
                    const matchesName = nameQuery ? user.name?.includes(nameQuery) : true;
                    return matchesEmail && matchesName;
                });
                setUsers(filtered);
            } catch (error) {
                console.error("검색 결과 불러오기 실패", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterUsers();
    }, [emailQuery, nameQuery]);

    return (
        <main className="max-w-4xl mx-auto p-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold">🔍 회원 검색 결과</h2>
                <p className="text-sm text-gray-400">
                    검색어: 이메일 "{emailQuery}", 닉네임 "{nameQuery}"
                </p>
            </div>
            <div className="border border-white text-white p-4 rounded">
                {loading ? (
                    <p>로딩 중...</p>
                ) : users.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    <ul className="list-disc pl-5 mt-2">
                        {users.map((user) => (
                            <li key={user.id}>
                                {String(user.email)} ({String(user.name)}) - 가입일:{" "}
                                {new Date(user.createdAt).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-4">
                <Link href="/admin" className="text-blue-500 hover:underline">
                    ← 돌아가기
                </Link>
            </div>
        </main>
    );
}
