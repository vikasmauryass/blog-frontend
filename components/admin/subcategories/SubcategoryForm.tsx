"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { getCategoryOptions } from "@/lib/api/categories";
import type { Category } from "@/types/category";
import type { Subcategory } from "@/types/subcategory";

interface SubcategoryFormProps {
	categories: Category[];
	subcategory?: Subcategory;
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

export default function SubcategoryForm({
	categories,
	subcategory,
}: SubcategoryFormProps) {
	const router = useRouter();

	const isEditMode = Boolean(subcategory);

	const [categoryId, setCategoryId] = useState(
		subcategory?.category?.id?.toString() ?? "",
	);

	const [name, setName] = useState(subcategory?.name ?? "");

	const [slug, setSlug] = useState(subcategory?.slug ?? "");

	const [description, setDescription] = useState(
		subcategory?.description ?? "",
	);

	const [status, setStatus] = useState(subcategory?.status ?? true);

	// In edit mode, preserve the existing slug.
	// In create mode, generate it automatically until
	// the user manually edits the slug.
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
		useState(isEditMode);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [error, setError] = useState("");

	const [categorySearch, setCategorySearch] = useState(
		subcategory?.category?.name ?? "",
	);

	const [categoryOptions, setCategoryOptions] =
		useState<Category[]>(categories);

	const [showCategoryOptions, setShowCategoryOptions] = useState(false);

	const [isLoadingCategories, setIsLoadingCategories] = useState(false);

	const categorySearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!categoryId) {
			setError("Please select a category.");
			return;
		}

		try {
			setIsSubmitting(true);
			setError("");

			const payload = {
				category_id: Number(categoryId),
				name: name.trim(),
				slug: slug.trim(),
				description: description.trim(),
				status,
			};

			const url = isEditMode
				? `/api/admin/subcategories/${subcategory.id}`
				: "/api/admin/subcategories";

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
				throw new Error(data?.message || "Failed to save subcategory.");
			}

			router.push("/admin/subcategories");
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

	function handleCategorySearch(value: string) {
		setCategorySearch(value);
		setCategoryId("");

		setShowCategoryOptions(true);

		if (categorySearchTimeout.current) {
			clearTimeout(categorySearchTimeout.current);
		}

		categorySearchTimeout.current = setTimeout(async () => {
			try {
				setIsLoadingCategories(true);

				const response = await getCategoryOptions(value);

				setCategoryOptions(response.data);
			} catch (error) {
				console.error("Failed to search categories:", error);

				setCategoryOptions([]);
			} finally {
				setIsLoadingCategories(false);
			}
		}, 300);
	}	

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-xl border border-slate-200 bg-white shadow-sm"
		>
			{/* Header */}
			<div className="border-b border-slate-200 px-6 py-5">
				<h2 className="text-lg font-semibold text-slate-900">
					{isEditMode ? "Edit Subcategory" : "Create Subcategory"}
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					{isEditMode
						? "Update the subcategory information."
						: "Add a new subcategory under a category."}
				</p>
			</div>

			{/* Fields */}
			<div className="space-y-6 p-6">
				{/* Category */}
				<div className="relative">
					<label
						htmlFor="category"
						className="mb-2 block text-sm font-medium text-slate-700"
					>
						Category <span className="text-red-500">*</span>
					</label>

					<input
						id="category"
						type="text"
						value={categorySearch}
						onChange={(event) =>
							handleCategorySearch(event.target.value)
						}
						onFocus={() => {
							setShowCategoryOptions(true);
						}}
						placeholder="Search category..."
						autoComplete="off"
						required={!categoryId}
						className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>

					{showCategoryOptions && (
						<div className="absolute z-30 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
							{isLoadingCategories ? (
								<div className="px-3 py-3 text-sm text-slate-500">
									Searching categories...
								</div>
							) : categoryOptions.length === 0 ? (
								<div className="px-3 py-3 text-sm text-slate-500">
									No categories found.
								</div>
							) : (
								categoryOptions.map((category) => (
									<button
										key={category.id}
										type="button"
										onClick={() => {
											setCategoryId(
												category.id.toString(),
											);

											setCategorySearch(category.name);

											setShowCategoryOptions(false);
										}}
										className="block w-full px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
									>
										<div className="font-medium">
											{category.name}
										</div>

										<div className="text-xs text-slate-400">
											{category.slug}
										</div>
									</button>
								))
							)}
						</div>
					)}

					<p className="mt-1 text-xs text-slate-400">
						Search and select the parent category.
					</p>
				</div>

				{/* Name */}
				<div>
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium text-slate-700"
					>
						Subcategory Name <span className="text-red-500">*</span>
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
						placeholder="e.g. React"
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
						placeholder="e.g. react"
						className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>

					<p className="mt-1 text-xs text-slate-400">
						Automatically generated from the subcategory name. You
						can edit it manually.
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
						rows={5}
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="Enter subcategory description..."
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
					disabled={isSubmitting}
					onClick={() => router.push("/admin/subcategories")}
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
							? "Update Subcategory"
							: "Create Subcategory"}
				</button>
			</div>
		</form>
	);
}
