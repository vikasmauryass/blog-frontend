export interface ReviewUser {
	id: number;
	name: string;
}

export interface Review {
	id: number;
	post_id: number;
	user_id: number;
	rating: number;
	review: string | null;
	status: string;
	created_at: string;
	updated_at: string | null;
	user: ReviewUser;
}

export interface ReviewPaginationLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface ReviewPagination {
	current_page: number;
	data: Review[];
	first_page_url: string;
	from: number | null;
	last_page: number;
	last_page_url: string;
	links: ReviewPaginationLink[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number | null;
	total: number;
}

export interface ReviewsResponse {
	data: {
		average_rating: number;
		reviews: ReviewPagination;
	};
}

export interface CreateReviewRequest {
	rating: number;
	review?: string | null;
}

export interface ReviewActionResponse {
	message: string;
	data: Review;
}
