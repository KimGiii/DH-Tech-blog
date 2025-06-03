"use client";

import { useEffect, useState } from "react";

interface LikeButtonsProps {
    postId: number;
    initialLikeCount: number;
    initialDislikeCount: number;
}

export default function LikeButtons({ postId }: LikeButtonsProps) {
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [dislikeCount, setDislikeCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<"none" | "like" | "dislike">("none");

    // 페이지 첫 로드 시 현재 좋아요/싫어요 개수 가져오기
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await fetch(`/api/post/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setLikeCount(data.likeCount);
                    setDislikeCount(data.dislikeCount);
                } else {
                    console.error("좋아요/싫어요 개수 가져오기 실패");
                }
            } catch (error) {
                console.error("좋아요/싫어요 데이터 로드 중 오류:", error);
            }
        };

        fetchCounts();
    }, [postId]);

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
                disabled={loading !== "none" || likeCount === null}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
            >
                <span>👍</span>
                <span className="text-blue-700 font-bold">
                    {likeCount !== null ? likeCount : "…"}
                </span>
            </button>
            <button
                onClick={handleDislike}
                disabled={loading !== "none" || dislikeCount === null}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
            >
                <span>👎</span>
                <span className="text-red-700 font-bold">
                    {dislikeCount !== null ? dislikeCount : "…"}
                </span>
            </button>
        </div>
    );
}
