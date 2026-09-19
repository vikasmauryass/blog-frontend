"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Category } from "@/types/category";

interface CategoryFormProps {
	category?: Category;
}

function generateSlug(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export default function CategoryForm({ category }: CategoryFormProps) {
	const router = useRouter();

	const isEditMode = Boolean(category);

	const [name, setName] = useState(category?.name ?? "");
	const [slug, setSlug] = useState(category?.slug ?? "");
	const [description, setDescription] = useState(category?.description ?? "");
	const [status, setStatus] = useState(category?.status ?? true);

	const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
		useState(isEditMode);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			setIsSubmitting(true);
			setError("");

			const payload = {
				name: name.trim(),
				slug: slug.trim(),
				description: description.trim(),
				status,
			};

			const url = isEditMode
				? `/api/admin/categories/${category.id}`
				: "/api/admin/categories";

			const method = isEditMode ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(data?.message || "Something went wrong.");
			}

			router.push("/admin/categories");
			router.refresh();
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Something went wrong.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-xl border border-slate-200 bg-white shadow-sm"
		>
			{/* Form header */}
			<div className="border-b border-slate-200 px-6 py-5">
				<h2 className="text-lg font-semibold text-slate-900">
					{isEditMode ? "Edit Category" : "Create Category"}
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					{isEditMode
						? "Update the category information."
						: "Add a new category to your blog."}
				</p>
			</div>

			{/* Fields */}
			<div className="space-y-6 p-6">
				{/* Name */}
				<div>
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium text-slate-700"
					>
						Category Name <span className="text-red-500">*</span>
					</label>

					<input
						id="name"
						type="text"
						value={name}
						onChange={(event) => {
							const value = event.target.value;

							setName(value);

							if (!isSlugManuallyEdited) {
								setSlug(generateSlug(value));
							}
						}}
						placeholder="e.g. Technology"
						required
						className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>
				</div>

				{/* Slug */}
				<div>
					<label
						htmlFor="slug"
						className="mb-2 block text-sm font-medium text-slate-700"
					>
						Slug
					</label>

					<input
						id="slug"
						type="text"
						value={slug}
						onChange={(event) => {
							setSlug(event.target.value);
							setIsSlugManuallyEdited(true);
						}}
						placeholder="e.g. technology"
						className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>

					<p className="mt-1 text-xs text-slate-400">
						Automatically generated from the category name. You can
						edit it manually.
					</p>
				</div>

				{/* Description */}
				<div>
					<label
						htmlFor="description"
						className="mb-2 block text-sm font-medium text-slate-700"
					>
						Description
					</label>

					<textarea
						id="description"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="Enter category description..."
						rows={5}
						className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>
				</div>

				{/* Status */}
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700">
						Status
					</label>

					<label className="inline-flex cursor-pointer items-center gap-3">
						<input
							type="checkbox"
							checked={status}
							onChange={(event) =>
								setStatus(event.target.checked)
							}
							className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
						/>

						<span className="text-sm text-slate-700">Active</span>
					</label>
				</div>

				{/* Error */}
				{error && (
					<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{error}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
				<button
					type="button"
					onClick={() => router.push("/admin/categories")}
					disabled={isSubmitting}
					className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
				>
					Cancel
				</button>

				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting
						? "Saving..."
						: isEditMode
							? "Update Category"
							: "Create Category"}
				</button>
			</div>
		</form>
	);
}
