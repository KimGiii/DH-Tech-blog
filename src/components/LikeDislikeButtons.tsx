// components/LikeButtons.tsx
"use client";

import { useState } from "react";

interface LikeButtonsProps {
    postId: number;
    initialLikeCount: number;
    initialDislikeCount: number;
}

export default function LikeButtons({
                                        postId,
                                        initialLikeCount,
                                        initialDislikeCount,
                                    }: LikeButtonsProps) {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
    const [loading, setLoading] = useState<"none" | "like" | "dislike">("none");

    // 좋아요 클릭 핸들러
    const handleLike = async () => {
        if (loading !== "none") return;
        setLoading("like");

        try {
            const res = await fetch(`/api/post/${postId}/like`, {
                method: "POST",
            });
            if (res.ok) {
                const data = await res.json();
                setLikeCount(data.likeCount);
            } else {
                console.error("좋아요 요청 실패");
            }
        } catch (err) {
            console.error("좋아요 요청 중 오류:", err);
        } finally {
            setLoading("none");
        }
    };

    // 싫어요 클릭 핸들러
    const handleDislike = async () => {
        if (loading !== "none") return;
        setLoading("dislike");

        try {
            const res = await fetch(`/api/post/${postId}/dislike`, {
                method: "POST",
            });
            if (res.ok) {
                const data = await res.json();
                setDislikeCount(data.dislikeCount);
            } else {
                console.error("싫어요 요청 실패");
            }
        } catch (err) {
            console.error("싫어요 요청 중 오류:", err);
        } finally {
            setLoading("none");
        }
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            <button
                onClick={handleLike}
                disabled={loading !== "none"}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
            >
                <span>👍</span>
                <span>{likeCount}</span>
            </button>

            <button
                onClick={handleDislike}
                disabled={loading !== "none"}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
            >
                <span>👎</span>
                <span>{dislikeCount}</span>
            </button>
        </div>
    );
}
