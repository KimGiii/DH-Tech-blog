import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // 1. 사용자 존재 확인
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ message: "존재하지 않는 사용자입니다." }, { status: 401 });
    }

    // 2. 비밀번호 비교
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    // 3. JWT 발급
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    // 4. 쿠키에 토큰 저장 (선택)
    const response = NextResponse.json({ message: "로그인 성공" });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return response;
}
