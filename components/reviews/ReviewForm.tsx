"use client";

import { FormEvent, useState } from "react";

interface ReviewFormProps {
	postId: number;
	initialRating?: number;
	initialReview?: string;
	reviewId?: number;
	onSuccess: () => void;
	onCancel?: () => void;
}

export default function ReviewForm({
	postId,
	initialRating = 0,
	initialReview = "",
	reviewId,
	onSuccess,
	onCancel,
}: ReviewFormProps) {
	const [rating, setRating] = useState(initialRating);
	const [review, setReview] = useState(initialReview);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const isEdit = Boolean(reviewId);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (rating < 1 || rating > 5) {
			setError("Please select a rating from 1 to 5.");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const url = isEdit
				? `/api/reviews/${reviewId}`
				: `/api/posts/${postId}/reviews`;

			const response = await fetch(url, {
				method: isEdit ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					rating,
					review: review.trim() || null,
				}),
			});

			const data = await response.json();

			if (response.status === 401) {
				const redirect = encodeURIComponent(window.location.pathname);

				window.location.href = `/login?redirect=${redirect}`;
				return;
			}

			if (!response.ok) {
				throw new Error(data?.message || "Failed to submit review.");
			}

			onSuccess();
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Something went wrong.",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
		>
			<h3 className="font-semibold text-slate-900">
				{isEdit ? "Edit your review" : "Write a review"}
			</h3>

			<div className="mt-1">
				<p className="mb-2 text-sm font-medium text-slate-700">
					Rating
				</p>

				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => setRating(star)}
							disabled={loading}
							aria-label={`${star} star`}
							className="text-3xl leading-none"
						>
							<span
								className={
									star <= rating
										? "text-yellow-500"
										: "text-slate-300"
								}
							>
								★
							</span>
						</button>
					))}
				</div>
			</div>

			<textarea
				value={review}
				onChange={(event) => setReview(event.target.value)}
				placeholder="Write your review..."
				maxLength={5000}
				rows={5}
				disabled={loading}
				className="mt-2 w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-500"
			/>

			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}

			<div className="mt-3 flex justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						disabled={loading}
						className="min-h-10 rounded-lg px-4 text-sm text-slate-600 hover:bg-slate-100"
					>
						Cancel
					</button>
				)}

				<button
					type="submit"
					disabled={loading || rating === 0}
					className="min-h-10 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white disabled:opacity-50"
				>
					{loading
						? "Saving..."
						: isEdit
							? "Update Review"
							: "Submit Review"}
				</button>
			</div>
		</form>
	);
}
