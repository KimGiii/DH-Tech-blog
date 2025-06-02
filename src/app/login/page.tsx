"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        // NextAuth Credentials Provider를 통한 로그인 시도
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.error) {
            // 로그인 실패 시: 에러 메시지 보여주기
            setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        // 로그인 성공 시, 관리자 여부에 따라 리다이렉트
        if (email === "admin@nomail.com") {
            router.push("/admin");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">로그인</h1>
                {errorMsg && (
                    <div className="text-red-500 mb-4 text-center">{errorMsg}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-white">
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 font-medium text-white"
                        >
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded px-3 py-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                    <button
                        type="button"
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
                    >
                        GitHub 로그인
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/join")}
                        className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 mt-2"
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
