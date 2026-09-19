export interface Tag {
	id: number;
	name: string;
	slug: string;
	created_at: string;
}

export interface CreateTagRequest {
	name: string;
	slug?: string;
}

export interface UpdateTagRequest {
	name: string;
	slug?: string;
}

export interface TagResponse {
	data: Tag;
}

export interface TagListResponse {
	data: Tag[];

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

		links: {
			url: string | null;
			label: string;
			page: number | null;
			active: boolean;
		}[];

		path: string;
	};
}

export interface DeleteTagResponse {
	message?: string;
}
