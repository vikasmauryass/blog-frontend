import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { deleteReview, updateReview } from "@/lib/api/reviews";
import { getAuthToken } from "@/lib/auth";

interface RouteContext {
	params: Promise<{
		id: string;
	}>;
}

function getReviewId(id: string) {
	const reviewId = Number(id);

	if (!Number.isInteger(reviewId) || reviewId <= 0) {
		return null;
	}

	return reviewId;
}

export async function PUT(request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;
		const reviewId = getReviewId(id);

		if (!reviewId) {
			return NextResponse.json(
				{ message: "Invalid review ID." },
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

		const response = await updateReview(
			reviewId,
			{
				rating: body.rating,
				review: body.review,
			},
			token,
		);

		return NextResponse.json(response);
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(error.data || { message: error.message }, {
				status: error.status,
			});
		}

		return NextResponse.json(
			{ message: "Failed to update review." },
			{ status: 500 },
		);
	}
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
	try {
		const { id } = await context.params;
		const reviewId = getReviewId(id);

		if (!reviewId) {
			return NextResponse.json(
				{ message: "Invalid review ID." },
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

		await deleteReview(reviewId, token);

		return NextResponse.json({
			message: "Review deleted successfully.",
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(error.data || { message: error.message }, {
				status: error.status,
			});
		}

		return NextResponse.json(
			{ message: "Failed to delete review." },
			{ status: 500 },
		);
	}
}
