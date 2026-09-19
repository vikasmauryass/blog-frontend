import { NextResponse } from "next/server";

import { createTag } from "@/lib/api/tags";
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

		const tag = await createTag(body, token);

		return NextResponse.json(
			{
				data: tag,
			},
			{
				status: 201,
			},
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error?.message || "Failed to create tag.",
				errors: error?.data?.errors || undefined,
			},
			{
				status: error?.status || 500,
			},
		);
	}
}
