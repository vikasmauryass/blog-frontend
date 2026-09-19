import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { setAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const response = await login(body);

		if (!response.token) {
			return NextResponse.json(
				{
					message: "Login succeeded but no token was returned.",
				},
				{
					status: 500,
				},
			);
		}

		await setAuthToken(response.token);

		return NextResponse.json({
			message: response.message,
			user: response.user,
		});
	} catch (error) {
		console.error("Login error:", error);

		if (error instanceof ApiError) {
			return NextResponse.json(
				error.data ?? {
					message: error.message,
				},
				{
					status: error.status,
				},
			);
		}

		return NextResponse.json(
			{
				message: "Unable to login. Please try again.",
			},
			{
				status: 500,
			},
		);
	}
}
