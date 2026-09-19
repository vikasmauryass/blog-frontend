import type { Media, MediaUploadResponse } from "@/types/media";
import { apiClient } from "./client";

export async function uploadPostMedia(
	postId: number,
	file: File,
	altText: string,
	caption: string,
	token: string,
): Promise<Media> {
	const formData = new FormData();

	formData.append("file", file);
	formData.append("alt_text", altText);
	formData.append("caption", caption);

	const response = await apiClient<MediaUploadResponse>(
		`/admin/posts/${postId}/media`,
		{
			method: "POST",
			body: formData,
			token,
		},
	);

	return response.data;
}

export async function deleteMedia(
	mediaId: number,
	token: string,
): Promise<void> {
	await apiClient<unknown>(`/admin/media/${mediaId}`, {
		method: "DELETE",
		token,
	});
}
