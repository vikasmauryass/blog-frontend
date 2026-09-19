import { apiClient } from "./client";

import type {
	CommentListResponse,
	CommentResponse,
	CreateCommentRequest,
} from "@/types/comment";

export async function getComments(
	postId: number,
	page = 1,
): Promise<CommentListResponse> {
	return apiClient<CommentListResponse>(
		`/posts/${postId}/comments?page=${page}`,
	);
}

export async function createComment(
	postId: number,
	data: CreateCommentRequest,
	token: string,
): Promise<CommentResponse> {
	return apiClient<CommentResponse>(`/posts/${postId}/comments`, {
		method: "POST",
		body: JSON.stringify(data),
		token,
	});
}
