import { apiClient } from "./client";

import type { SeoMetadata, SeoResponse, UpdateSeoRequest } from "@/types/seo";

export async function getPostSeo(postId: number): Promise<SeoMetadata> {
	const response = await apiClient<SeoResponse>(`/posts/${postId}/seo`);

	return response.data;
}

export async function updatePostSeo(
	postId: number,
	data: UpdateSeoRequest,
	token: string,
): Promise<SeoMetadata> {
	const response = await apiClient<SeoResponse>(
		`/admin/posts/${postId}/seo`,
		{
			method: "PUT",
			body: JSON.stringify(data),
			token,
		},
	);

	return response.data;
}
