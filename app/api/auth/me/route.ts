import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { getAuthToken } from "@/lib/auth";

export async function GET() {
	try {
		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthenticated." },
				{ status: 401 },
			);
		}

		const user = await getCurrentUser(token);

		return NextResponse.json({
			user,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(
				error.data || {
					message: error.message,
				},
				{
					status: error.status,
				},
			);
		}

		return NextResponse.json(
			{
				message: "Failed to fetch current user.",
			},
			{
				status: 500,
			},
		);
	}
}
