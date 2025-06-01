import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password, nickname } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return NextResponse.json({ message: "이미 존재하는 이메일입니다." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: { email, password: hashed, nickname },
    });

    return NextResponse.json({ message: "회원가입 성공" });
}
