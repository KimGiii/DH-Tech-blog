"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="flex flex-col items-start gap-2">
          <div className="text-white">
            이름: {session.user?.name} / 아이디: {session.user?.id}
          </div>
          <div className="flex gap-2">
            <Link
              href="/my"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              내 정보 보기
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              로그아웃
            </button>
            <button
              onClick={async () => {
                if (confirm("정말로 회원 탈퇴하시겠습니까?")) {
                  await fetch("/api/user/delete", { method: "DELETE" });
                  signOut({ callbackUrl: "/" });
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      ) : (
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
        </Link>
      )}
    </div>
  );
}
