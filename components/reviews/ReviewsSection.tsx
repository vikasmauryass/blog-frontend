"use client";

import { useCallback, useEffect, useState } from "react";

import type { Review } from "@/types/review";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface ReviewsSectionProps {
	postId: number;
}

interface CurrentUser {
	id: number;
	name: string;
}

export default function ReviewsSection({ postId }: ReviewsSectionProps) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);

	const [lastPage, setLastPage] = useState(1);
	const [total, setTotal] = useState(0);

	const [currentUserId, setCurrentUserId] = useState<number | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchCurrentUser = useCallback(async () => {
		try {
			const response = await fetch("/api/auth/me", {
				cache: "no-store",
			});

			if (!response.ok) {
				setCurrentUserId(null);
				return;
			}

			const data: {
				user: CurrentUser;
			} = await response.json();

			setCurrentUserId(data.user.id);
		} catch {
			setCurrentUserId(null);
		}
	}, []);

	const fetchReviews = useCallback(
		async (page = 1) => {
			try {
				setLoading(true);
				setError("");

				const response = await fetch(
					`/api/posts/${postId}/reviews?page=${page}`,
					{
						cache: "no-store",
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data?.message || "Failed to load reviews.");
				}

				const reviewData = data.data.reviews;

				setAverageRating(Number(data.data.average_rating || 0));

				setReviews(reviewData.data || []);

				setCurrentPage(reviewData.current_page);

				setLastPage(reviewData.last_page);

				setTotal(reviewData.total);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to load reviews.",
				);
			} finally {
				setLoading(false);
			}
		},
		[postId],
	);

	useEffect(() => {
		fetchCurrentUser();
		fetchReviews();
	}, [fetchCurrentUser, fetchReviews]);

	return (
		<section className="mt-10">
			<div className="mb-6">
				<h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
					Reviews
				</h2>

				<div className="mt-2 flex flex-wrap items-center gap-3">
					<span className="text-2xl font-bold text-slate-900">
						{averageRating.toFixed(1)}
					</span>

					<span
						className="text-xl text-yellow-500"
						aria-label={`${averageRating} average rating`}
					>
						{"★".repeat(Math.round(averageRating))}

						<span className="text-slate-300">
							{"★".repeat(5 - Math.round(averageRating))}
						</span>
					</span>

					<span className="text-sm text-slate-500">
						({total} {total === 1 ? "review" : "reviews"})
					</span>
				</div>
			</div>

			<div className="mb-6">
				<ReviewForm
					postId={postId}
					onSuccess={() => {
						fetchCurrentUser();
						fetchReviews(1);
					}}
				/>
			</div>

			{loading && (
				<p className="text-sm text-slate-500">Loading reviews...</p>
			)}

			{error && (
				<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
					{error}
				</div>
			)}

			{!loading && !error && (
				<>
					<ReviewList
						reviews={reviews}
						currentUserId={currentUserId}
						onRefresh={() => fetchReviews(currentPage)}
					/>

					{lastPage > 1 && (
						<div className="mt-6 flex items-center justify-between">
							<button
								type="button"
								disabled={currentPage === 1}
								onClick={() => fetchReviews(currentPage - 1)}
								className="min-h-10 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-40"
							>
								Previous
							</button>

							<span className="text-sm text-slate-500">
								Page {currentPage} of {lastPage}
							</span>

							<button
								type="button"
								disabled={currentPage === lastPage}
								onClick={() => fetchReviews(currentPage + 1)}
								className="min-h-10 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-40"
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</section>
	);
}
