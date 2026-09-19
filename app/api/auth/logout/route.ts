import { logout } from "@/lib/api/auth";
import { clearAuthToken, getAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const token = await getAuthToken();

		if (token) {
			try {
				await logout(token);
			} catch (error) {
				console.error("Laravel logout error:", error);
			}
		}

		await clearAuthToken();

		return NextResponse.json({
			message: "Logout successful",
		});
	} catch (error) {
		console.error("Logout error:", error);

		return NextResponse.json(
			{
				message: "Logout failed",
			},
			{
				status: 500,
			},
		);
	}
}
