import { apiClient } from "./client";

import type {
  AuthResponse,
  LoginRequest,
  LogoutResponse,
  MeResponse,
  RegisterRequest,
  User,
} from "@/types/auth";

export async function register(data: RegisterRequest): Promise<AuthResponse> {
	return apiClient<AuthResponse>("/auth/register", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
	return apiClient<AuthResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function getCurrentUser(token: string): Promise<User> {
	const response = await apiClient<MeResponse>("/auth/me", {
		method: "GET",
		token,
	});

	return response.user;
}

export async function logout(token: string): Promise<LogoutResponse> {
	return apiClient<LogoutResponse>("/auth/logout", {
		method: "POST",
		token,
	});
}
