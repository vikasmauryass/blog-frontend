import { apiClient } from "./client";

import type {
	CategorySubcategoriesResponse,
	CreateSubcategoryRequest,
	Subcategory,
	SubcategoryListResponse,
	SubcategoryResponse,
	UpdateSubcategoryRequest,
} from "@/types/subcategory";

export async function getSubcategories(
	page = 1,
): Promise<SubcategoryListResponse> {
	return apiClient<SubcategoryListResponse>(`/subcategories?page=${page}`);
}

export async function getSubcategory(id: number): Promise<Subcategory> {
	const response = await apiClient<SubcategoryResponse>(
		`/subcategories/${id}`,
	);

	return response.data;
}

export async function getSubcategoriesByCategory(
	categoryId: number,
): Promise<Subcategory[]> {
	const response = await apiClient<CategorySubcategoriesResponse>(
		`/categories/${categoryId}/subcategories`,
	);

	return response.data;
}

export async function createSubcategory(
	data: CreateSubcategoryRequest,
	token: string,
): Promise<Subcategory> {
	const response = await apiClient<SubcategoryResponse>(
		"/admin/subcategories",
		{
			method: "POST",
			body: JSON.stringify(data),
			token,
		},
	);

	return response.data;
}

export async function updateSubcategory(
	id: number,
	data: UpdateSubcategoryRequest,
	token: string,
): Promise<Subcategory> {
	const response = await apiClient<SubcategoryResponse>(
		`/admin/subcategories/${id}`,
		{
			method: "PUT",
			body: JSON.stringify(data),
			token,
		},
	);

	return response.data;
}

export async function deleteSubcategory(
	id: number,
	token: string,
): Promise<void> {
	await apiClient<unknown>(`/admin/subcategories/${id}`, {
		method: "DELETE",
		token,
	});
}
