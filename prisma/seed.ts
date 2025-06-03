import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // 1. 관리자 계정
    const adminPwd = await bcrypt.hash('password123', 10);
    await prisma.user.create({
        data: { email: 'admin@hanaro.com', hashedPassword: adminPwd, nickname: 'admin', role: 'ADMIN' },
    });

    // 2. 일반 회원 5명
    for (let i = 1; i <= 5; i++) {
        const pwd = await bcrypt.hash(`user${i}pass`, 10);
        await prisma.user.create({
            data: { email: `user${i}@hanaro.com`, hashedPassword: pwd, nickname: `user${i}` },
        });
    }

    // 3. 카테고리별 게시글 8개씩
    const categories = ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'ETC'] as const;
    for (const cat of categories) {
        for (let i = 1; i <= 8; i++) {
            await prisma.post.create({
                data: {
                    authorId: 2, // user1
                    title: `${cat} 예시 게시글 ${i}`,
                    content: `${cat} 관련 예시 내용입니다. 게시글 번호 ${i}.`,
                    category: cat,
                },
            });
        }
    }

    // 4. 리액션 예시
    await prisma.reaction.create({ data: { userId: 2, postId: 1, type: 'LIKE' } });
    await prisma.reaction.create({ data: { userId: 3, postId: 2, type: 'DISLIKE' } });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
