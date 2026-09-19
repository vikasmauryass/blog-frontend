import { apiClient } from "./client";

import type { LikeActionResponse, LikeData, LikeResponse } from "@/types/like";

export async function getPostLike(postId: number): Promise<LikeData> {
	const response = await apiClient<LikeResponse>(`/posts/${postId}/likes`);

	return response.data;
}

export async function likePost(
	postId: number,
	token: string,
): Promise<LikeActionResponse> {
	return apiClient<LikeActionResponse>(`/posts/${postId}/like`, {
		method: "POST",
		token,
	});
}

export async function unlikePost(
	postId: number,
	token: string,
): Promise<LikeActionResponse> {
	return apiClient<LikeActionResponse>(`/posts/${postId}/like`, {
		method: "DELETE",
		token,
	});
}
