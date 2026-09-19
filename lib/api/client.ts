const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
	throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type RequestOptions = RequestInit & {
	token?: string;
};

export class ApiError extends Error {
	status: number;
	data: unknown;

	constructor(status: number, message: string, data: unknown) {
		super(message);

		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

export async function apiClient<T>(
	endpoint: string,
	options: RequestOptions = {},
): Promise<T> {
	const { token, ...fetchOptions } = options;

	const headers = new Headers(fetchOptions.headers);

	if (!(fetchOptions.body instanceof FormData)) {
		headers.set("Content-Type", "application/json");
	}

	headers.set("Accept", "application/json");

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const response = await fetch(`${API_URL}${endpoint}`, {
		...fetchOptions,
		headers,
	});

	if (!response.ok) {
		let errorData: unknown = null;

		try {
			errorData = await response.json();
		} catch {
			// Response was not JSON
		}

		let message = response.statusText || "API request failed.";

		if (
			typeof errorData === "object" &&
			errorData !== null &&
			"message" in errorData &&
			typeof errorData.message === "string"
		) {
			message = errorData.message;
		}

		throw new ApiError(response.status, message, errorData);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json();
}
