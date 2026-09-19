"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LikeButtonProps {
	postId: number;
}

interface LikeData {
	post_id: number;
	likes_count: number;
	liked: boolean;
}

export default function LikeButton({ postId }: LikeButtonProps) {
	const router = useRouter();

	const [likeData, setLikeData] = useState<LikeData | null>(null);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadLikes() {
			try {
				setLoading(true);
				setError("");

				const response = await fetch(`/api/posts/${postId}/like`, {
					method: "GET",
					cache: "no-store",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data?.message || "Unable to load likes.");
				}

				setLikeData(data.data);
			} catch (error) {
				console.error("Load likes error:", error);

				setError(
					error instanceof Error
						? error.message
						: "Unable to load likes.",
				);
			} finally {
				setLoading(false);
			}
		}

		loadLikes();
	}, [postId]);

	async function handleLike() {
		if (actionLoading || !likeData) return;

		try {
			setActionLoading(true);
			setError("");

			const method = likeData.liked ? "DELETE" : "POST";

			const response = await fetch(`/api/posts/${postId}/like`, {
				method,
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 401) {
					router.push(
						`/login?redirect=/blog/${window.location.pathname.split("/").pop()}`,
					);
					return;
				}

				throw new Error(data?.message || "Unable to update like.");
			}

			setLikeData((previous) => {
				if (!previous) return previous;

				return {
					...previous,
					likes_count: data.data.liked
						? previous.likes_count + 1
						: Math.max(0, previous.likes_count - 1),
					liked: data.data.liked,
				};
			});
		} catch (error) {
			console.error("Like action error:", error);

			setError(
				error instanceof Error
					? error.message
					: "Unable to update like.",
			);
		} finally {
			setActionLoading(false);
		}
	}

	if (loading) {
		return (
			<div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
				Loading likes...
			</div>
		);
	}

	if (!likeData) {
		return null;
	}

	return (
		<div>
			<button
				type="button"
				onClick={handleLike}
				disabled={actionLoading}
				aria-pressed={likeData.liked}
				className={`
          inline-flex
          min-h-11
          items-center
          gap-2
          rounded-full
          border
          px-4
          py-2
          text-sm
          font-semibold
          transition
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${
				likeData.liked
					? "border-red-200 bg-red-50 text-red-600"
					: "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
			}
        `}
			>
				<span className="text-lg">{likeData.liked ? "❤️" : "♡"}</span>

				<span>
					{actionLoading
						? "Updating..."
						: likeData.liked
							? "Liked"
							: "Like"}
				</span>

				<span className="text-slate-500">{likeData.likes_count}</span>
			</button>

			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	);
}
