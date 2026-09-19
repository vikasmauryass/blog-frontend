"use client";

import { useRef, useState } from "react";

import { getCategoryOptions } from "@/lib/api/categories";

import type { Category } from "@/types/category";
import type { PostFormData } from "@/types/post";
import type { CategorySubcategory } from "@/types/subcategory";
import type { Tag } from "@/types/tag";

interface PostClassificationProps {
	form: PostFormData;

	categories: Category[];

	subcategories: CategorySubcategory[];

	tags: Tag[];

	loadingCategories: boolean;

	loadingSubcategories: boolean;

	loadingTags: boolean;

	onChange: (
		field: keyof PostFormData,
		value: string | number | number[] | null,
	) => void;

	onCategoryChange: (categoryId: number | null) => void;
}

export default function PostClassification({
	form,
	categories,
	subcategories,
	tags,
	loadingCategories,
	loadingSubcategories,
	loadingTags,
	onChange,
	onCategoryChange,
}: PostClassificationProps) {
	const selectedCategory = categories.find(
		(category) => category.id === form.category_id,
	);

	const [categorySearch, setCategorySearch] = useState(
		selectedCategory?.name ?? "",
	);

	const [categoryOptions, setCategoryOptions] =
		useState<Category[]>(categories);

	const [showCategoryOptions, setShowCategoryOptions] = useState(false);

	const [searchingCategories, setSearchingCategories] = useState(false);

	const categorySearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);

	function handleCategorySearch(value: string) {
		setCategorySearch(value);

		// If user starts searching again,
		// remove the currently selected category.
		if (form.category_id !== null) {
			onCategoryChange(null);
		}

		setShowCategoryOptions(true);

		if (categorySearchTimeout.current) {
			clearTimeout(categorySearchTimeout.current);
		}

		categorySearchTimeout.current = setTimeout(async () => {
			try {
				setSearchingCategories(true);

				const response = await getCategoryOptions(value);

				setCategoryOptions(response.data);
			} catch (error) {
				console.error("Failed to search categories:", error);

				setCategoryOptions([]);
			} finally {
				setSearchingCategories(false);
			}
		}, 300);
	}

	function handleCategorySelect(category: Category) {
		setCategorySearch(category.name);

		setShowCategoryOptions(false);

		setCategoryOptions((previous) => {
			const alreadyExists = previous.some(
				(item) => item.id === category.id,
			);

			if (alreadyExists) {
				return previous;
			}

			return [category, ...previous];
		});

		onCategoryChange(category.id);
	}

	return (
		<section className="rounded-lg border bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">
					Classification
				</h2>

				<p className="mt-1 text-sm text-gray-500">
					Organize your post using categories, subcategories and tags.
				</p>
			</div>

			<div className="space-y-5">
				{/* Category + Subcategory */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{/* Category */}
					<div className="relative">
						<label
							htmlFor="post-category"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Category
						</label>

						<input
							id="post-category"
							type="text"
							value={categorySearch}
							disabled={loadingCategories}
							onChange={(e) =>
								handleCategorySearch(e.target.value)
							}
							onFocus={() => {
								setShowCategoryOptions(true);
							}}
							placeholder={
								loadingCategories
									? "Loading categories..."
									: "Search category..."
							}
							autoComplete="off"
							className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
						/>

						{/* Category dropdown */}
						{showCategoryOptions && !loadingCategories && (
							<div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
								{searchingCategories ? (
									<div className="px-3 py-3 text-sm text-gray-500">
										Searching categories...
									</div>
								) : categoryOptions.length === 0 ? (
									<div className="px-3 py-3 text-sm text-gray-500">
										No categories found.
									</div>
								) : (
									categoryOptions.map((category) => (
										<button
											key={category.id}
											type="button"
											onClick={() =>
												handleCategorySelect(category)
											}
											className={`block w-full px-3 py-2.5 text-left text-sm transition hover:bg-gray-50 ${
												form.category_id === category.id
													? "bg-blue-50 text-blue-700"
													: "text-gray-700"
											}`}
										>
											<div className="font-medium">
												{category.name}
											</div>

											<div className="text-xs text-gray-400">
												{category.slug}
											</div>
										</button>
									))
								)}
							</div>
						)}

						<p className="mt-1 text-xs text-gray-500">
							Search and select a category.
						</p>
					</div>

					{/* Subcategory */}
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Subcategory
						</label>

						<select
							value={form.subcategory_id ?? ""}
							disabled={!form.category_id || loadingSubcategories}
							onChange={(e) =>
								onChange(
									"subcategory_id",
									e.target.value
										? Number(e.target.value)
										: null,
								)
							}
							className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 disabled:bg-gray-100"
						>
							<option value="">
								{!form.category_id
									? "Select category first"
									: loadingSubcategories
										? "Loading subcategories..."
										: "Select subcategory"}
							</option>

							{subcategories.map((subcategory) => (
								<option
									key={subcategory.id}
									value={subcategory.id}
								>
									{subcategory.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Tags */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">
						Tags
					</label>

					<select
						multiple
						value={form.tags.map(String)}
						disabled={loadingTags}
						onChange={(e) => {
							const selectedTags = Array.from(
								e.target.selectedOptions,
							).map((option) => Number(option.value));

							const uniqueTags = [...new Set(selectedTags)];

							onChange("tags", uniqueTags);
						}}
						className="min-h-32 w-full rounded-md border border-gray-300 px-3 py-2.5 disabled:bg-gray-100"
					>
						{loadingTags ? (
							<option disabled>Loading tags...</option>
						) : (
							tags.map((tag) => (
								<option key={tag.id} value={tag.id}>
									{tag.name}
								</option>
							))
						)}
					</select>

					<p className="mt-1 text-xs text-gray-500">
						Hold Ctrl/Cmd to select multiple tags.
					</p>
				</div>
			</div>
		</section>
	);
}
