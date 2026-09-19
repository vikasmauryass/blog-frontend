import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { createSubcategory } from "@/lib/api/subcategories";
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
        }
      );
    }

    const body = await request.json();

    const subcategory =
      await createSubcategory(
        body,
        token
      );

    return NextResponse.json(
      {
        data: subcategory,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Create subcategory error:",
      error
    );

    if (error instanceof ApiError) {
      return NextResponse.json(
        error.data ?? {
          message: error.message,
        },
        {
          status: error.status,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Failed to create subcategory.",
      },
      {
        status: 500,
      }
    );
  }
}