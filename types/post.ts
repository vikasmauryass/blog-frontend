export type PostStatus = "draft" | "published";

export type PostContentType = "article" | "video" | "mixed";

export interface PostFormData {
	title: string;
	slug: string;
	excerpt: string;

	category_id: number | null;
	subcategory_id: number | null;

	content_type: PostContentType;
	status: PostStatus;
	published_at: string;

	tags: number[];

	content: string;

	meta_title: string;
	meta_description: string;
	meta_keywords: string;
	canonical_url: string;
	og_title: string;
	og_description: string;
	og_image: string;
}

export interface PostAuthor {
	id: number;
	name: string;
}

export interface PostCategory {
	id: number;
	name: string;
	slug: string;
}

export interface PostSubcategory {
	id: number;
	name: string;
	slug: string;
}

export interface PostTag {
	id: number;
	name: string;
	slug: string;
	created_at: string | null;
}

export interface PostMedia {
	id: number;
	type: string;
	file_name: string;
	mime_type: string;
	file_size: number;
	url: string;
	alt_text: string | null;
	caption: string | null;
	created_at: string;
}

export interface PostSeo {
	id: number;
	meta_title: string | null;
	meta_description: string | null;
	meta_keywords: string | null;
	canonical_url: string | null;
	og_title: string | null;
	og_description: string | null;
	og_image: string | null;
}

export interface Post {
	id: number;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string | null;
	content_type: string;
	status: PostStatus;
	published_at: string | null;

	author: PostAuthor;

	category: PostCategory;

	subcategory: PostSubcategory | null;

	tags: PostTag[];

	media?: PostMedia[];

	seo?: PostSeo;

	created_at: string;
	updated_at: string | null;
}

export interface CreatePostRequest {
	category_id: number;
	subcategory_id: number | null;

	title: string;
	slug: string;
	excerpt: string;
	content: string;

	content_type: PostContentType;
	status: PostStatus;

	published_at: string | null;

	tags: number[];
}

export interface UpdatePostRequest extends CreatePostRequest {}

export interface PostResponse {
	data: Post;
}

export interface PostListResponse {
	data: Post[];

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
export interface PostSearchParams {
	search?: string;
	category_id?: number;
	category_slug?: string;
	subcategory_id?: number;
	subcategory_slug?: string;
	tag_id?: number;
	tag_slug?: string;
	content_type?: string;
	sort?: "latest" | "oldest";
	per_page?: number;
	page?: number;
}