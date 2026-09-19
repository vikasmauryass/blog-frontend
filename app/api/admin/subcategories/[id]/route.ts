import { NextResponse } from "next/server";

import { deleteSubcategory, updateSubcategory } from "@/lib/api/subcategories";

import { ApiError } from "@/lib/api/client";
import { getAuthToken } from "@/lib/auth";

interface RouteContext {
	params: Promise<{
		id: string;
	}>;
}

function getSubcategoryId(id: string) {
	const subcategoryId = Number(id);

	if (!Number.isInteger(subcategoryId) || subcategoryId <= 0) {
		return null;
	}

	return subcategoryId;
}

export async function PUT(request: Request, context: RouteContext) {
	try {
		const { id } = await context.params;

		const subcategoryId = getSubcategoryId(id);

		if (!subcategoryId) {
			return NextResponse.json(
				{
					message: "Invalid subcategory ID.",
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

		const subcategory = await updateSubcategory(subcategoryId, body, token);

		return NextResponse.json({
			data: subcategory,
		});
	} catch (error) {
		console.error("Update subcategory error:", error);

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
				message: "Failed to update subcategory.",
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

		const subcategoryId = getSubcategoryId(id);

		if (!subcategoryId) {
			return NextResponse.json(
				{
					message: "Invalid subcategory ID.",
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

		await deleteSubcategory(subcategoryId, token);

		return NextResponse.json({
			message: "Subcategory deleted successfully.",
		});
	} catch (error) {
		console.error("Delete subcategory error:", error);

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
				message: "Failed to delete subcategory.",
			},
			{
				status: 500,
			},
		);
	}
}
