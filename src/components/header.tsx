"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import homeIcon from "@/assets/home.png";

export default function Header() {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto">
            <div className="w-full max-w-4xl mx-auto flex justify-between items-center px-4 pt-4 gap-2">
                <div>
                    <Link href="/">
                        <Image
                            src={homeIcon}
                            alt="Home"
                            width={32}
                            height={32}
                            className="hover:opacity-80 transition"
                        />
                    </Link>
                </div>
                <div className="flex gap-2">
                    {session ? (
                        <>
                            <Link
                                href="/my"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                내 정보 보기
                            </Link>
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
            </div>
        </div>
    );
}
