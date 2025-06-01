"use client";

import { useState } from "react";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Mock role-based navigation logic
    if (email === "admin@example.com") {
      window.location.href = "/admin"; // 관리자 페이지
    } else {
      window.location.href = "/"; // 일반 사용자 메인 페이지
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">로그인</h1>
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
            <label htmlFor="password" className="block mb-1 font-medium text-white">
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => window.location.href = "/user/join"}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 mt-2"
          >
            회원가입
          </button>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 mt-2"
          >
            GitHub 로그인
          </button>
        </form>
      </div>
    </div>
  );
}
