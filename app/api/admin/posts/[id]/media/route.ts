import { uploadPostMedia } from "@/lib/api/media";
import { getAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
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

		const formData = await request.formData();

		const file = formData.get("file");
		const altText = formData.get("alt_text");
		const caption = formData.get("caption");

		if (!(file instanceof File)) {
			return NextResponse.json(
				{ message: "File is required." },
				{ status: 422 },
			);
		}

		const media = await uploadPostMedia(
			postId,
			file,
			typeof altText === "string" ? altText : "",
			typeof caption === "string" ? caption : "",
			token,
		);

		return NextResponse.json({ data: media }, { status: 201 });
	} catch (error: unknown) {
		console.error("Upload media error:", error);

		const err = error as {
			message?: string;
			data?: { errors?: unknown };
			status?: number;
		};

		return NextResponse.json(
			{
				message: err?.message || "Failed to upload media.",
				errors: err?.data?.errors || undefined,
			},
			{
				status: err?.status || 500,
			},
		);
	}
}
