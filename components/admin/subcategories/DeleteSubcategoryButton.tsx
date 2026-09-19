"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteSubcategoryButtonProps {
	subcategoryId: number;
	subcategoryName: string;
}

export default function DeleteSubcategoryButton({
	subcategoryId,
	subcategoryName,
}: DeleteSubcategoryButtonProps) {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const [error, setError] = useState("");

	async function handleDelete() {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${subcategoryName}"?`,
		);

		if (!confirmed) {
			return;
		}

		try {
			setIsDeleting(true);
			setError("");

			const response = await fetch(
				`/api/admin/subcategories/${subcategoryId}`,
				{
					method: "DELETE",
				},
			);

			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(
					data?.message || "Failed to delete subcategory.",
				);
			}

			router.refresh();
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Failed to delete subcategory.",
			);
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={handleDelete}
				disabled={isDeleting}
				className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isDeleting ? "Deleting..." : "Delete"}
			</button>

			{error && (
				<p className="absolute right-0 top-full z-10 mt-1 w-52 text-right text-xs text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}
