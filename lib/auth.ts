import { cookies } from "next/headers";

const AUTH_COOKIE = "auth_token";

export async function setAuthToken(token: string) {
	const cookieStore = await cookies();

	cookieStore.set(AUTH_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
	});
}

export async function getAuthToken() {
	const cookieStore = await cookies();

	return cookieStore.get(AUTH_COOKIE)?.value;
}

export async function clearAuthToken() {
	const cookieStore = await cookies();

	cookieStore.delete(AUTH_COOKIE);
}
