import Link from "next/link";
import { prisma } from "@/utils/prismaClient";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query?.trim() || "";

  if (!query) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🔍 검색 결과</h1>
        <p className="text-gray-500">검색어를 입력해 주세요.</p>
      </main>
    );
  }

  // 제목 또는 내용에 검색어가 포함된 게시글 검색
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // authorId로 닉네임 조회
  const authorIds = Array.from(new Set(posts.map((p) => p.authorId)));
  const authors = await prisma.localUser.findMany({
    where: { id: { in: authorIds } },
    select: { id: true, nickname: true },
  });
  const authorMap = Object.fromEntries(authors.map((a) => [a.id, a.nickname]));

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🔍 "{query}" 검색 결과</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-4">
              <Link href={`/posts/${post.id}`}>
                <div className="text-xl font-semibold hover:underline">{post.title}</div>
                <p className="text-sm text-gray-500 mt-1">
                  by <span className="font-medium">{authorMap[post.authorId] || "익명"}</span> · {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </p>
                <p className="text-gray-700 mt-2 line-clamp-2">{post.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
