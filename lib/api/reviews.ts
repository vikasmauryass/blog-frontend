import { apiClient } from "./client";

import type {
	CreateReviewRequest,
	ReviewActionResponse,
	ReviewsResponse,
} from "@/types/review";

export async function getReviews(
	postId: number,
	page = 1,
): Promise<ReviewsResponse> {
	return apiClient<ReviewsResponse>(`/posts/${postId}/reviews?page=${page}`);
}

export async function createReview(
	postId: number,
	data: CreateReviewRequest,
	token: string,
): Promise<ReviewActionResponse> {
	return apiClient<ReviewActionResponse>(`/posts/${postId}/reviews`, {
		method: "POST",
		body: JSON.stringify(data),
		token,
	});
}

export async function updateReview(
	reviewId: number,
	data: CreateReviewRequest,
	token: string,
): Promise<ReviewActionResponse> {
	return apiClient<ReviewActionResponse>(`/reviews/${reviewId}`, {
		method: "PUT",
		body: JSON.stringify(data),
		token,
	});
}

export async function deleteReview(
	reviewId: number,
	token: string,
): Promise<void> {
	await apiClient(`/reviews/${reviewId}`, {
		method: "DELETE",
		token,
	});
}
