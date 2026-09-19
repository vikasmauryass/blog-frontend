export interface SubcategoryCategory {
	id: number;
	name: string;
	slug: string;
}

export interface Subcategory {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	status: boolean;
	category: SubcategoryCategory;
	created_at: string | null;
}

export interface CreateSubcategoryRequest {
	category_id: number;
	name: string;
	slug?: string;
	description?: string;
	status: boolean;
}

export interface UpdateSubcategoryRequest {
	category_id: number;
	name: string;
	slug?: string;
	description?: string;
	status: boolean;
}

export interface SubcategoryResponse {
	data: Subcategory;
}

export interface SubcategoryListResponse {
	data: Subcategory[];

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
}

export interface CategorySubcategory {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	status: boolean;
	created_at: string | null;
}


export interface CategorySubcategoriesResponse {
	data: Subcategory[];
}
