import { NextResponse } from "next/server";

import { createCategory } from "@/lib/api/categories";

import { getAuthToken } from "@/lib/auth";

import { ApiError } from "@/lib/api/client";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthenticated." },
				{ status: 401 },
			);
		}

		const category = await createCategory(body, token);

		return NextResponse.json(
			{
				data: category,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Create category error:", error);

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
				message: "Failed to create category.",
			},
			{
				status: 500,
			},
		);
	}
}
