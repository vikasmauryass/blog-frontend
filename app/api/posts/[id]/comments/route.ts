import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { createComment, getComments } from "@/lib/api/comments";
import { getAuthToken } from "@/lib/auth";

interface RouteContext {
	params: Promise<{
		id: string;
	}>;
}

function getPostId(id: string) {
	const postId = Number(id);

	if (!Number.isInteger(postId) || postId <= 0) {
		return null;
	}

	return postId;
}

export async function GET(request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;
		const postId = getPostId(id);

		if (!postId) {
			return NextResponse.json(
				{ message: "Invalid post ID." },
				{ status: 400 },
			);
		}

		const page = Number(request.nextUrl.searchParams.get("page") || "1");

		if (!Number.isInteger(page) || page < 1) {
			return NextResponse.json(
				{ message: "Invalid page number." },
				{ status: 400 },
			);
		}

		const response = await getComments(postId, page);

		return NextResponse.json(response);
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(error.data || { message: error.message }, {
				status: error.status,
			});
		}

		return NextResponse.json(
			{ message: "Failed to fetch comments." },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;
		const postId = getPostId(id);

		if (!postId) {
			return NextResponse.json(
				{ message: "Invalid post ID." },
				{ status: 400 },
			);
		}

		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Authentication required." },
				{ status: 401 },
			);
		}

		const body = await request.json();

		const response = await createComment(
			postId,
			{
				content: body.content,
				parent_id: body.parent_id ?? null,
			},
			token,
		);

		return NextResponse.json(response, {
			status: 201,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(error.data || { message: error.message }, {
				status: error.status,
			});
		}

		return NextResponse.json(
			{ message: "Failed to create comment." },
			{ status: 500 },
		);
	}
}
