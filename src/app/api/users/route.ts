import { NextResponse } from "next/server";
import {PrismaClient} from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
