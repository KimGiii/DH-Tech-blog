// File: app/category/js/[id]/LikeDislikeButtons.tsx
"use client";

import { useState, useEffect } from "react";

interface Props {
    postId: number;
    initialLikes?: number;
    initialDislikes?: number;
}

export default function LikeDislikeButtons({ postId, initialLikes = 0, initialDislikes = 0 }: Props) {
    const [likes, setLikes] = useState<number>(initialLikes);
    const [dislikes, setDislikes] = useState<number>(initialDislikes);
    const [userAction, setUserAction] = useState<"liked" | "disliked" | null>(null);

    const handleLike = async () => {
        if (userAction === "liked") return;
        setLikes((prev) => prev + 1);
        if (userAction === "disliked") {
            setDislikes((prev) => prev - 1);
        }
        setUserAction("liked");
        // TODO: Call an API endpoint to persist like, e.g.:
        // await fetch(`/api/post/${postId}/like`, { method: "POST" });
    };

    const handleDislike = async () => {
        if (userAction === "disliked") return;
        setDislikes((prev) => prev + 1);
        if (userAction === "liked") {
            setLikes((prev) => prev - 1);
        }
        setUserAction("disliked");
        // TODO: Call an API endpoint to persist dislike, e.g.:
        // await fetch(`/api/post/${postId}/dislike`, { method: "POST" });
    };

    return (
        <div className="flex items-center gap-4 mt-6">
            <button
                onClick={handleLike}
                className={`px-3 py-1 rounded ${
                    userAction === "liked" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
                👍 좋아요 {likes}
            </button>
            <button
                onClick={handleDislike}
                className={`px-3 py-1 rounded ${
                    userAction === "disliked" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
                👎 싫어요 {dislikes}
            </button>
        </div>
    );
}
