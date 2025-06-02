import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/utils/prismaClient"; // 클라이언트 가져오기

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
            },
        });

        return NextResponse.json(
            { message: "User created successfully.", user: { email: newUser.email, name: newUser.name } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error: ", error);
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
