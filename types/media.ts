export interface Media {
	id: number;
	post_id: number;
	type: string;
	file_path: string;
	file_name: string;
	mime_type: string;
	file_size: number;
	alt_text: string | null;
	caption: string | null;
	url?: string;
	created_at: string;
	updated_at?: string;
}

export interface MediaUploadResponse {
	message: string;
	data: Media;
}

export interface PostMediaForm {
	file: File | null;
	altText: string;
	caption: string;
}
