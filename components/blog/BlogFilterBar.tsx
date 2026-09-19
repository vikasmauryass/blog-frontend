"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { getCategories } from "@/lib/api/categories";
import { getSubcategoriesByCategory } from "@/lib/api/subcategories";
import { getTags } from "@/lib/api/tags";

import type { Category } from "@/types/category";
import type { Subcategory } from "@/types/subcategory";
import type { Tag } from "@/types/tag";

export default function BlogFilterBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(searchParams.get("search") || "");

	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);

	const [categorySlug, setCategorySlug] = useState(
		searchParams.get("category_slug") || "",
	);

	const [subcategorySlug, setSubcategorySlug] = useState(
		searchParams.get("subcategory_slug") || "",
	);

	const [tagSlug, setTagSlug] = useState(searchParams.get("tag_slug") || "");

	const [loadingCategories, setLoadingCategories] = useState(true);
	const [loadingSubcategories, setLoadingSubcategories] = useState(false);
	const [loadingTags, setLoadingTags] = useState(true);

	/*
	|--------------------------------------------------------------------------
	| Load Categories + Tags
	|--------------------------------------------------------------------------
	*/

	useEffect(() => {
		async function loadFilters() {
			try {
				const [categoryResponse, tagResponse] = await Promise.all([
					getCategories(),
					getTags(),
				]);

				setCategories(categoryResponse.data);
				setTags(tagResponse.data);
			} catch (error) {
				console.error("Failed to load blog filters:", error);
			} finally {
				setLoadingCategories(false);
				setLoadingTags(false);
			}
		}

		loadFilters();
	}, []);

	/*
	|--------------------------------------------------------------------------
	| Load Subcategories when Category changes
	|--------------------------------------------------------------------------
	*/

	useEffect(() => {
		async function loadSubcategories() {
			if (!categorySlug) {
				setSubcategories([]);
				return;
			}

			const selectedCategory = categories.find(
				(category) => category.slug === categorySlug,
			);

			if (!selectedCategory) {
				setSubcategories([]);
				return;
			}

			try {
				setLoadingSubcategories(true);

				const data = await getSubcategoriesByCategory(
					selectedCategory.id,
				);

				setSubcategories(data);
			} catch (error) {
				console.error("Failed to load subcategories:", error);

				setSubcategories([]);
			} finally {
				setLoadingSubcategories(false);
			}
		}

		loadSubcategories();
	}, [categorySlug, categories]);

	/*
	|--------------------------------------------------------------------------
	| Update URL
	|--------------------------------------------------------------------------
	*/

	const updateUrl = (updates: Record<string, string>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		});

		// Always start from page 1 when a filter changes.
		params.set("page", "1");

		router.push(`/blog?${params.toString()}`);
	};

	/*
	|--------------------------------------------------------------------------
	| Search
	|--------------------------------------------------------------------------
	*/

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		updateUrl({
			search: search.trim(),
		});
	};

	/*
	|--------------------------------------------------------------------------
	| Category
	|--------------------------------------------------------------------------
	*/

	const handleCategoryChange = (value: string) => {
		setCategorySlug(value);

		// Category changes should reset subcategory.
		setSubcategorySlug("");

		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set("category_slug", value);
		} else {
			params.delete("category_slug");
		}

		params.delete("subcategory_slug");

		params.set("page", "1");

		router.push(`/blog?${params.toString()}`);
	};

	/*
	|--------------------------------------------------------------------------
	| Subcategory
	|--------------------------------------------------------------------------
	*/

	const handleSubcategoryChange = (value: string) => {
		setSubcategorySlug(value);

		updateUrl({
			subcategory_slug: value,
		});
	};

	/*
	|--------------------------------------------------------------------------
	| Tag
	|--------------------------------------------------------------------------
	*/

	const handleTagChange = (value: string) => {
		setTagSlug(value);

		updateUrl({
			tag_slug: value,
		});
	};

	/*
	|--------------------------------------------------------------------------
	| Clear
	|--------------------------------------------------------------------------
	*/

	const handleClear = () => {
		setSearch("");
		setCategorySlug("");
		setSubcategorySlug("");
		setTagSlug("");

		router.push("/blog");
	};

	const hasFilters =
		searchParams.get("search") ||
		searchParams.get("category_slug") ||
		searchParams.get("subcategory_slug") ||
		searchParams.get("tag_slug");

	return (
		<section className="mb-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
			{/* Search */}
			<form
				onSubmit={handleSearch}
				className="flex flex-col gap-3 sm:flex-row"
			>
				<div className="relative flex-1">
					<span className="pointer-events-none absolute left-3 top-1/4 -translate-y-1/4 text-lg text-slate-400">
						⌕
					</span>

					<input
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search articles..."
						className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>
				</div>

				<button
					type="submit"
					className="h-11 rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition hover:bg-blue-700"
				>
					Search
				</button>
			</form>

			{/* Filters */}
			<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{/* Category */}
				<div>
					<label
						htmlFor="category"
						className="mb-1.5 block text-xs font-medium text-slate-600"
					>
						Category
					</label>

					<select
						id="category"
						value={categorySlug}
						onChange={(event) =>
							handleCategoryChange(event.target.value)
						}
						disabled={loadingCategories}
						className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					>
						<option value="">
							{loadingCategories
								? "Loading categories..."
								: "All Categories"}
						</option>

						{categories.map((category) => (
							<option key={category.id} value={category.slug}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				{/* Subcategory */}
				<div>
					<label
						htmlFor="subcategory"
						className="mb-1.5 block text-xs font-medium text-slate-600"
					>
						Subcategory
					</label>

					<select
						id="subcategory"
						value={subcategorySlug}
						onChange={(event) =>
							handleSubcategoryChange(event.target.value)
						}
						disabled={!categorySlug || loadingSubcategories}
						className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
					>
						<option value="">
							{!categorySlug
								? "Select category first"
								: loadingSubcategories
									? "Loading subcategories..."
									: "All Subcategories"}
						</option>

						{subcategories.map((subcategory) => (
							<option
								key={subcategory.id}
								value={subcategory.slug}
							>
								{subcategory.name}
							</option>
						))}
					</select>
				</div>

				{/* Tag */}
				<div>
					<label
						htmlFor="tag"
						className="mb-1.5 block text-xs font-medium text-slate-600"
					>
						Tag
					</label>

					<select
						id="tag"
						value={tagSlug}
						onChange={(event) =>
							handleTagChange(event.target.value)
						}
						disabled={loadingTags}
						className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					>
						<option value="">
							{loadingTags ? "Loading tags..." : "All Tags"}
						</option>

						{tags.map((tag) => (
							<option key={tag.id} value={tag.slug}>
								{tag.name}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Clear */}
			{hasFilters && (
				<div className="mt-4 flex justify-end">
					<button
						type="button"
						onClick={handleClear}
						className="text-sm font-medium text-slate-600 hover:text-blue-600"
					>
						Clear filters
					</button>
				</div>
			)}
		</section>
	);
}
