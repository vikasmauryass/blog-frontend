import { NextResponse } from "next/server";

import { deleteTag, updateTag } from "@/lib/api/tags";
import { getAuthToken } from "@/lib/auth";

export async function PUT(
	request: Request,
	context: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const { id } = await context.params;

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

		const tag = await updateTag(Number(id), body, token);

		return NextResponse.json({
			data: tag,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error?.message || "Failed to update tag.",
				errors: error?.data?.errors || undefined,
			},
			{
				status: error?.status || 500,
			},
		);
	}
}

export async function DELETE(
	request: Request,
	context: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const { id } = await context.params;

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

		await deleteTag(Number(id), token);

		return NextResponse.json({
			message: "Tag deleted successfully.",
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error?.message || "Failed to delete tag.",
			},
			{
				status: error?.status || 500,
			},
		);
	}
}
