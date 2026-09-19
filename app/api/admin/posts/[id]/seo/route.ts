import { updatePostSeo } from "@/lib/api/seo";
import { getAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
	request: Request,
	context: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const token = await getAuthToken();

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthenticated." },
				{ status: 401 },
			);
		}

		const { id } = await context.params;
		const postId = Number(id);

		if (!Number.isInteger(postId) || postId <= 0) {
			return NextResponse.json(
				{ message: "Invalid post ID." },
				{ status: 400 },
			);
		}

		const body = await request.json();

		const seo = await updatePostSeo(postId, body, token);

		return NextResponse.json({ data: seo }, { status: 200 });
	} catch (error: any) {
		console.error("Update SEO error:", error);

		return NextResponse.json(
			{
				message: error?.message || "Failed to update SEO.",
				errors: error?.data?.errors || undefined,
			},
			{
				status: error?.status || 500,
			},
		);
	}
}
