import { getCurrentUser } from "@/lib/api/auth";
import { getAuthToken } from "@/lib/auth";

export async function getAuthenticatedUser() {
	const token = await getAuthToken();

	if (!token) {
		return null;
	}

	try {
		const user = await getCurrentUser(token);

		return {
			user,
			token,
		};
	} catch {
		return null;
	}
}
