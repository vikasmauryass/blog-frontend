export interface ApiErrorResponse {
	message?: string;
	errors?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
	message?: string;
	data: T;
}

export interface PaginationLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface PaginationLinks {
	first: string | null;
	last: string | null;
	prev: string | null;
	next: string | null;
}

export interface PaginationMeta {
	current_page: number;
	from: number | null;
	last_page: number;
	links: PaginationLink[];
	path: string;
	per_page: number;
	to: number | null;
	total: number;
}