import type { PaginationLinks, PaginationMeta } from "@/types/api";

export interface Category {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	status: boolean;
	created_at: string;
	updated_at: string | null;
}

export interface CreateCategoryRequest {
	name: string;
	slug?: string;
	description?: string;
	status: boolean;
}

export interface UpdateCategoryRequest {
	name: string;
	slug?: string;
	description?: string;
	status: boolean;
}

export interface CategoryResponse {
	data: Category;
}

export interface CategoryListResponse {
	data: Category[];

	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};

	meta: {
		current_page: number;
		from: number | null;
		last_page: number;
		per_page: number;
		to: number | null;
		total: number;
	};

	data: Category[];
	links: PaginationLinks;
	meta: PaginationMeta;
}
