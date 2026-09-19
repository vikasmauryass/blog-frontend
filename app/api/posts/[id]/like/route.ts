import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { getPostLike, likePost, unlikePost } from "@/lib/api/likes";
import { getAuthToken } from "@/lib/auth";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const postId = Number(id);

    if (!Number.isInteger(postId) || postId <= 0) {
      return NextResponse.json(
        {
          message: "Invalid post ID.",
        },
        {
          status: 400,
        },
      );
    }

    const data = await getPostLike(postId);

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error("Get like error:", error);

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
        message: "Unable to load like information.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const postId = Number(id);

    if (!Number.isInteger(postId) || postId <= 0) {
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
          message: "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }

    const response = await likePost(postId, token);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Like post error:", error);

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
        message: "Unable to like this post.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const postId = Number(id);

    if (!Number.isInteger(postId) || postId <= 0) {
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
          message: "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }

    const response = await unlikePost(postId, token);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unlike post error:", error);

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
        message: "Unable to unlike this post.",
      },
      {
        status: 500,
      },
    );
  }
}