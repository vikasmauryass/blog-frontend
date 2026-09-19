import { apiClient } from "./client";

import type {
	Category,
	CategoryListResponse,
	CategoryResponse,
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from "@/types/category";

// export async function getCategories(): Promise<CategoryListResponse> {
// 	return apiClient<CategoryListResponse>("/categories");
// }

export async function getCategories(
	page = 1,
	perPage = 10,
	search = "",
): Promise<CategoryListResponse> {
	const params = new URLSearchParams();

	params.set("page", String(page));
	params.set("per_page", String(perPage));

	if (search.trim()) {
		params.set("search", search.trim());
	}

	return apiClient<CategoryListResponse>(`/categories?${params.toString()}`);
}

export async function getCategoryOptions(
	search = "",
): Promise<CategoryListResponse> {
	const params = new URLSearchParams();

	params.set("page", "1");
	params.set("per_page", "10");

	if (search.trim()) {
		params.set("search", search.trim());
	}

	return apiClient<CategoryListResponse>(`/categories?${params.toString()}`);
}

export async function getCategory(id: number): Promise<Category> {
	const response = await apiClient<CategoryResponse>(`/categories/${id}`);

	return response.data;
}

export async function createCategory(
	data: CreateCategoryRequest,
	token: string,
): Promise<Category> {
	const response = await apiClient<CategoryResponse>("/admin/categories", {
		method: "POST",
		body: JSON.stringify(data),
		token,
	});

	return response.data;
}

export async function updateCategory(
	id: number,
	data: UpdateCategoryRequest,
	token: string,
): Promise<Category> {
	const response = await apiClient<CategoryResponse>(
		`/admin/categories/${id}`,
		{
			method: "PUT",
			body: JSON.stringify(data),
			token,
		},
	);

	return response.data;
}

export async function deleteCategory(id: number, token: string): Promise<void> {
	await apiClient<unknown>(`/admin/categories/${id}`, {
		method: "DELETE",
		token,
	});
}
