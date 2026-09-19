export interface SeoMetadata {
	id: number;
	meta_title: string | null;
	meta_description: string | null;
	meta_keywords: string | null;
	canonical_url: string | null;
	og_title: string | null;
	og_description: string | null;
	og_image: string | null;
}

export interface UpdateSeoRequest {
	meta_title: string;
	meta_description: string;
	meta_keywords: string;
	canonical_url: string;
	og_title: string;
	og_description: string;
	og_image: string;
}

export interface SeoResponse {
	data: SeoMetadata;
}
