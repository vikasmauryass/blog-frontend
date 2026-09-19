export interface Like {
	id: number;
	post_id: number;
	user_id: number;
	created_at?: string;
	updated_at?: string;
}
export interface LikeStatus {
	likes_count: number;
	liked_by_user: boolean;
}

export interface LikeData {
	post_id: number;
	likes_count: number;
	liked: boolean;
}

export interface LikeResponse {
	data: LikeData;
}

export interface LikeActionResponse {
	message: string;
	data: {
		post_id: number;
		liked: boolean;
	};
}