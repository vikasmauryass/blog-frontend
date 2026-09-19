export interface CommentAuthor {
	id: number;
	name: string;
}

export interface Comment {
	id: number;
	content: string;
	status: string;
	author: CommentAuthor;
	parent_id: number | null;
	replies: Comment[];
	created_at: string;
	updated_at: string | null;
}

export interface CommentPaginationLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface CommentPagination {
	current_page: number;
	from: number | null;
	last_page: number;
	links: CommentPaginationLink[];
	path: string;
	per_page: number;
	to: number | null;
	total: number;
}

export interface CommentListResponse {
	data: Comment[];
	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};
	meta: CommentPagination;
}

export interface CreateCommentRequest {
	content: string;
	parent_id?: number | null;
}

export interface CommentResponse {
	data: Comment;
}
