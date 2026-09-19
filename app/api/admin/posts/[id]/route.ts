import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { deletePost, getAdminPost, updatePost } from "@/lib/api/posts";
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

export async function GET(_request: NextRequest, { params }: RouteContext) {
	try {
		const { id } = await params;

		const postId = getPostId(id);

		if (!postId) {
			return NextResponse.json(
				{
					message: "Invalid post ID.",
				},
				{
					status: 400,
				},
			);
		}

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

		const post = await getAdminPost(postId, token);

		return NextResponse.json({
			data: post,
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

		console.error("Get admin post error:", error);

		return NextResponse.json(
			{
				message: "Failed to fetch post.",
			},
			{
				status: 500,
			},
		);
	}
}

export async function PUT(request: Request, { params }: RouteContext) {
	try {
		const { id } = await params;

		const postId = getPostId(id);

		if (!postId) {
			return NextResponse.json(
				{
					message: "Invalid post ID.",
				},
				{
					status: 400,
				},
			);
		}

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

		const post = await updatePost(postId, body, token);

		return NextResponse.json(
			{
				data: post,
			},
			{
				status: 200,
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

		console.error("Update admin post error:", error);

		return NextResponse.json(
			{
				message: "Failed to update post.",
			},
			{
				status: 500,
			},
		);
	}
}

export async function DELETE(_request: Request, { params }: RouteContext) {
	try {
		const { id } = await params;

		const postId = getPostId(id);

		if (!postId) {
			return NextResponse.json(
				{
					message: "Invalid post ID.",
				},
				{
					status: 400,
				},
			);
		}

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

		await deletePost(postId, token);

		return NextResponse.json(
			{
				message: "Post deleted successfully.",
			},
			{
				status: 200,
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

		console.error("Delete admin post error:", error);

		return NextResponse.json(
			{
				message: "Failed to delete post.",
			},
			{
				status: 500,
			},
		);
	}
}
