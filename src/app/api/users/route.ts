import { NextResponse } from "next/server";
import {PrismaClient} from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const emailFilter = searchParams.get("email") || undefined;
    const nameFilter = searchParams.get("name") || undefined;

    try {
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    emailFilter ? { email: { contains: emailFilter } } : {},
                    nameFilter ? { name: { contains: nameFilter } } : {},
                ],
            },
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
