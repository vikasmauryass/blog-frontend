import { NextResponse } from "next/server";

import { deleteCategory, updateCategory } from "@/lib/api/categories";

import { getAuthToken } from "@/lib/auth";

import { ApiError } from "@/lib/api/client";

interface RouteContext {
	params: Promise<{
		id: string;
	}>;
}

function getCategoryId(id: string) {
	const categoryId = Number(id);

	if (!Number.isInteger(categoryId) || categoryId <= 0) {
		return null;
	}

	return categoryId;
}

export async function PUT(request: Request, context: RouteContext) {
	try {
		const { id } = await context.params;

		const categoryId = getCategoryId(id);

		if (!categoryId) {
			return NextResponse.json(
				{ message: "Invalid category ID." },
				{ status: 400 },
			);
		}

		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthenticated." },
				{ status: 401 },
			);
		}

		const body = await request.json();

		const category = await updateCategory(categoryId, body, token);

		return NextResponse.json({
			data: category,
		});
	} catch (error) {
		console.error("Update category error:", error);

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
				message: "Failed to update category.",
			},
			{
				status: 500,
			},
		);
	}
}

export async function DELETE(_request: Request, context: RouteContext) {
	try {
		const { id } = await context.params;

		const categoryId = getCategoryId(id);

		if (!categoryId) {
			return NextResponse.json(
				{ message: "Invalid category ID." },
				{ status: 400 },
			);
		}

		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthenticated." },
				{ status: 401 },
			);
		}

		await deleteCategory(categoryId, token);

		return NextResponse.json({
			message: "Category deleted successfully.",
		});
	} catch (error) {
		console.error("Delete category error:", error);

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
				message: "Failed to delete category.",
			},
			{
				status: 500,
			},
		);
	}
}
