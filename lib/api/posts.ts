import { apiClient } from "./client";

import type {
	CreatePostRequest,
	Post,
	PostListResponse,
	PostResponse,
	PostSearchParams,
	UpdatePostRequest,
} from "@/types/post";

export async function getPosts(page = 1): Promise<PostListResponse> {
	return apiClient<PostListResponse>(`/posts?page=${page}`);
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const response = await apiClient<PostResponse>(`/posts/${slug}`);

	return response.data;
}

export async function createPost(
	data: CreatePostRequest,
	token: string,
): Promise<Post> {
	const response = await apiClient<PostResponse>("/admin/posts", {
		method: "POST",
		body: JSON.stringify(data),
		token,
	});

	return response.data;
}

export async function updatePost(
	id: number,
	data: UpdatePostRequest,
	token: string,
): Promise<Post> {
	const response = await apiClient<PostResponse>(`/admin/posts/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
		token,
	});

	return response.data;
}

export async function deletePost(id: number, token: string): Promise<void> {
	await apiClient<unknown>(`/admin/posts/${id}`, {
		method: "DELETE",
		token,
	});
}

export async function getAdminPost(id: number, token: string): Promise<Post> {
	const response = await apiClient<PostResponse>(`/admin/posts/${id}`, {
		method: "GET",
		token,
	});

	return response.data;
}

export async function searchPosts(
	params: PostSearchParams = {},
): Promise<PostListResponse> {
	const query = new URLSearchParams();

	if (params.search) {
		query.set("search", params.search);
	}

	if (params.category_id) {
		query.set("category_id", String(params.category_id));
	}

	if (params.category_slug) {
		query.set("category_slug", params.category_slug);
	}

	if (params.subcategory_id) {
		query.set("subcategory_id", String(params.subcategory_id));
	}

	if (params.subcategory_slug) {
		query.set("subcategory_slug", params.subcategory_slug);
	}

	if (params.tag_id) {
		query.set("tag_id", String(params.tag_id));
	}

	if (params.tag_slug) {
		query.set("tag_slug", params.tag_slug);
	}

	if (params.content_type) {
		query.set("content_type", params.content_type);
	}

	if (params.sort) {
		query.set("sort", params.sort);
	}

	if (params.per_page) {
		query.set("per_page", String(params.per_page));
	}

	if (params.page) {
		query.set("page", String(params.page));
	}

	const queryString = query.toString();

	return apiClient<PostListResponse>(
		`/posts/search${queryString ? `?${queryString}` : ""}`,
	);
}