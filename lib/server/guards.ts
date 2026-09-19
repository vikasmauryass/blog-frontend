import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "./auth";

export async function requireAuth() {
	const auth = await getAuthenticatedUser();

	if (!auth) {
		redirect("/login");
	}

	if (!auth.user.status) {
		redirect("/login?error=account-disabled");
	}

	return auth;
}

export async function requireAdmin() {
	const auth = await requireAuth();

	const role = auth.user.role?.name?.toLowerCase();

	if (role !== "admin") {
		// redirect("/account");
		redirect("/blog");
	}

	return auth;
}

export async function requireGuest() {
	const auth = await getAuthenticatedUser();

	if (auth) {
		// redirect("/account");
		redirect("/blog");
	}

	return null;
}
