// components/LikeDislikeButtons.tsx
"use client";

import { useState, useEffect } from "react";

interface Props {
    postId: number;
}

export default function LikeDislikeButtons({ postId }: Props) {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [dislikeCount, setDislikeCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // 컴포넌트 마운트 시 현재 카운트 로드
        const fetchCounts = async () => {
            try {
                const res = await fetch(`/api/post/${postId}`);
                if (!res.ok) throw new Error("게시글 정보를 불러오지 못했습니다.");
                const post = await res.json();
                setLikeCount(post.likeCount || 0);
                setDislikeCount(post.dislikeCount || 0);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCounts();
    }, [postId]);

    const handleLike = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/post/${postId}/like`, {
                method: "POST",
            });
            if (!res.ok) throw new Error("좋아요 처리에 실패했습니다.");
            const json = await res.json();
            setLikeCount(json.data.likeCount);
            setDislikeCount(json.data.dislikeCount);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDislike = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/post/${postId}/dislike`, {
                method: "POST",
            });
            if (!res.ok) throw new Error("싫어요 처리에 실패했습니다.");
            const json = await res.json();
            setLikeCount(json.data.likeCount);
            setDislikeCount(json.data.dislikeCount);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleLike}
                disabled={loading}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
                👍 좋아요 {likeCount}
            </button>
            <button
                onClick={handleDislike}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
                👎 싫어요 {dislikeCount}
            </button>
        </div>
    );
}
