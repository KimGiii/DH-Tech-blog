import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@/generated/prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma, {
        models: {
            User: prisma.gitUser, // User 대신 gitUser 사용
            Account: prisma.account,
            Session: prisma.session,
            VerificationToken: prisma.verificationToken,
        },
    }),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({session, token}) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});

export {handler as GET, handler as POST};
