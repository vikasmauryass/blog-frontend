import { apiClient } from "./client";

import type {
	CreateTagRequest,
	Tag,
	TagListResponse,
	TagResponse,
	UpdateTagRequest,
} from "@/types/tag";

export async function getTags(page = 1): Promise<TagListResponse> {
	return apiClient<TagListResponse>(`/tags?page=${page}`);
}

export async function getTag(id: number): Promise<Tag> {
	const response = await apiClient<TagResponse>(`/tags/${id}`);

	return response.data;
}

export async function createTag(
	data: CreateTagRequest,
	token: string,
): Promise<Tag> {
	const response = await apiClient<TagResponse>("/admin/tags", {
		method: "POST",
		body: JSON.stringify(data),
		token,
	});

	return response.data;
}

export async function updateTag(
	id: number,
	data: UpdateTagRequest,
	token: string,
): Promise<Tag> {
	const response = await apiClient<TagResponse>(`/admin/tags/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
		token,
	});

	return response.data;
}

export async function deleteTag(id: number, token: string): Promise<void> {
	await apiClient<unknown>(`/admin/tags/${id}`, {
		method: "DELETE",
		token,
	});
}
