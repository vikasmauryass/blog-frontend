"use client";

import { useState } from "react";

import type { Review } from "@/types/review";

import ReviewForm from "./ReviewForm";

interface ReviewListProps {
	reviews: Review[];
	currentUserId: number | null;
	onRefresh: () => void;
}

export default function ReviewList({
	reviews,
	currentUserId,
	onRefresh,
}: ReviewListProps) {
	const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

	async function handleDelete(reviewId: number) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this review?",
		);

		if (!confirmed) return;

		try {
			const response = await fetch(`/api/reviews/${reviewId}`, {
				method: "DELETE",
			});

			const data = await response.json();

			if (response.status === 401) {
				const redirect = encodeURIComponent(window.location.pathname);

				window.location.href = `/login?redirect=${redirect}`;

				return;
			}

			if (!response.ok) {
				throw new Error(data?.message || "Failed to delete review.");
			}

			onRefresh();
		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: "Failed to delete review.",
			);
		}
	}

	if (reviews.length === 0) {
		return (
			<div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
				<p className="text-sm text-slate-500">No reviews yet.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{reviews.map((review) => {
				const isOwner =
					currentUserId !== null && review.user_id === currentUserId;

				if (editingReviewId === review.id) {
					return (
						<ReviewForm
							key={review.id}
							postId={review.post_id}
							reviewId={review.id}
							initialRating={review.rating}
							initialReview={review.review || ""}
							onSuccess={() => {
								setEditingReviewId(null);
								onRefresh();
							}}
							onCancel={() => setEditingReviewId(null)}
						/>
					);
				}

				return (
					<article
						key={review.id}
						className="rounded-xl border border-slate-200 bg-white p-4"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-900">
									{review.user.name}
								</p>

								<p className="mt-1 text-xs text-slate-500">
									{new Date(
										review.created_at,
									).toLocaleString()}
								</p>
							</div>

							<div
								className="text-lg whitespace-nowrap"
								aria-label={`${review.rating} out of 5 stars`}
							>
								<span className="text-yellow-500">
									{"★".repeat(review.rating)}
								</span>

								<span className="text-slate-300">
									{"★".repeat(5 - review.rating)}
								</span>
							</div>
						</div>

						{review.review && (
							<p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
								{review.review}
							</p>
						)}

						{isOwner && (
							<div className="mt-4 flex justify-end gap-2">
								<button
									type="button"
									onClick={() =>
										setEditingReviewId(review.id)
									}
									className="min-h-9 rounded-lg px-3 text-sm text-slate-700 hover:bg-slate-100"
								>
									Edit
								</button>

								<button
									type="button"
									onClick={() => handleDelete(review.id)}
									className="min-h-9 rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
								>
									Delete
								</button>
							</div>
						)}
					</article>
				);
			})}
		</div>
	);
}
