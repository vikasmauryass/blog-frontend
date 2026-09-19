import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { createPost } from "@/lib/api/posts";
import { getAuthToken } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{
					message: "Unauthenticated.",
				},
				{
					status: 401,
				},
			);
		}

		const body = await request.json();

		const post = await createPost(body, token);

		return NextResponse.json(
			{
				data: post,
			},
			{
				status: 201,
			},
		);
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

		console.error("Create admin post error:", error);

		return NextResponse.json(
			{
				message: "Failed to create post.",
			},
			{
				status: 500,
			},
		);
	}
}
