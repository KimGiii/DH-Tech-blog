import Link from "next/link";

const dummyPosts = [
    { id: 1, title: "자바스크립트 비동기 처리 완전 정복", author: "홍길동", date: "2024.05.30" },
    { id: 2, title: "클로저와 this 완벽 가이드", author: "김철수", date: "2024.05.29" },
    { id: 3, title: "ES6 이후 달라진 문법 요약", author: "이영희", date: "2024.05.28" },
];

export default function JavaScriptCategoryPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">📂 JavaScript 게시글</h1>
            <ul className="space-y-6">
                {dummyPosts.map((post) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link href={`/posts/${post.id}`}>
                            <div className="text-xl font-semibold hover:underline">{post.title}</div>
                            <p className="text-sm text-gray-500 mt-1">
                                by <span className="font-medium">{post.author}</span> · {post.date}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
