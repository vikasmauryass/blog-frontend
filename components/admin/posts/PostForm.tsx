"use client";

import type { Category } from "@/types/category";
import type { Post, PostFormData } from "@/types/post";
import type { CategorySubcategory } from "@/types/subcategory";
import type { Tag } from "@/types/tag";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCategories } from "@/lib/api/categories";
import { getSubcategoriesByCategory } from "@/lib/api/subcategories";
import { getTags } from "@/lib/api/tags";
import type { PostMediaForm } from "@/types/media";
import PostBasicInfo from "./PostBasicInfo";
import PostClassification from "./PostClassification";
import PostEditor from "./PostEditor";
import PostMedia from "./PostMedia";
import PostSeo from "./PostSeo";

function generateSlug(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function formatPublishedAt(value: string): string | null {
	if (!value) {
		return null;
	}

	return `${value}:00`.replace("T", " ");
}

interface PostFormProps {
	initialData?: Post;
	postId?: number;
}

export default function PostForm({ initialData, postId }: PostFormProps) {
	const router = useRouter();
	const isEditing = Boolean(postId);

	const [form, setForm] = useState<PostFormData>({
		title: initialData?.title || "",
		slug: initialData?.slug || "",
		excerpt: initialData?.excerpt || "",
		category_id: initialData?.category?.id || null,
		subcategory_id: initialData?.subcategory?.id || null,
		content_type: (initialData?.content_type as any) || "article",
		status: initialData?.status || "draft",
		published_at: initialData?.published_at
			? initialData.published_at.slice(0, 16)
			: "",
		tags: initialData?.tags ? initialData.tags.map((t) => t.id) : [],
		content: initialData?.content || "",
		meta_title: initialData?.seo?.meta_title || "",
		meta_description: initialData?.seo?.meta_description || "",
		meta_keywords: initialData?.seo?.meta_keywords || "",
		canonical_url: initialData?.seo?.canonical_url || "",
		og_title: initialData?.seo?.og_title || "",
		og_description: initialData?.seo?.og_description || "",
		og_image: initialData?.seo?.og_image || "",
	});

	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<CategorySubcategory[]>(
		[],
	);
	const [tags, setTags] = useState<Tag[]>([]);

	const [loadingCategories, setLoadingCategories] = useState(true);
	const [loadingTags, setLoadingTags] = useState(true);
	const [loadingSubcategories, setLoadingSubcategories] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Track whether user manually changed the slug.
	// In edit mode, preserve the existing slug.
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing);

	const [media, setMedia] = useState<PostMediaForm>({
		file: null,
		altText: "",
		caption: "",
	});

	// Load categories and tags
	useEffect(() => {
		async function loadInitialData() {
			try {
				setError(null);

				const [categoryResponse, tagResponse] = await Promise.all([
					getCategories(),
					getTags(),
				]);

				setCategories(categoryResponse.data);
				setTags(tagResponse.data);
			} catch (err) {
				console.error(err);
				setError("Failed to load categories or tags.");
			} finally {
				setLoadingCategories(false);
				setLoadingTags(false);
			}
		}

		loadInitialData();
	}, []);

	// Pre-load subcategories if editing and category_id is set
	useEffect(() => {
		async function loadInitialSubcategories() {
			if (!initialData?.category?.id) return;

			try {
				const data = await getSubcategoriesByCategory(
					initialData.category.id,
				);

				setSubcategories(data);
			} catch (err) {
				console.error("Failed to load initial subcategories:", err);
			}
		}

		loadInitialSubcategories();
	}, [initialData]);

	// Load subcategories whenever category changes
	useEffect(() => {
		async function loadSubcategories() {
			if (!form.category_id) {
				setSubcategories([]);
				return;
			}

			if (
				initialData &&
				form.category_id === initialData.category?.id &&
				subcategories.length > 0
			) {
				return;
			}

			try {
				setLoadingSubcategories(true);
				setError(null);

				const data = await getSubcategoriesByCategory(form.category_id);

				setSubcategories(data);
			} catch (err) {
				console.error(err);
				setSubcategories([]);
				setError("Failed to load subcategories.");
			} finally {
				setLoadingSubcategories(false);
			}
		}

		loadSubcategories();
	}, [form.category_id]);

	function handleChange(
		field: keyof PostFormData,
		value: string | number | number[] | null,
	) {
		setForm((previous) => ({
			...previous,
			[field]: value,
		}));
	}

	function handleTitleChange(value: string) {
		setForm((previous) => ({
			...previous,
			title: value,
			...(!isSlugManuallyEdited
				? {
						slug: generateSlug(value),
					}
				: {}),
		}));
	}

	function handleSlugChange(value: string) {
		setForm((previous) => ({
			...previous,
			slug: value,
		}));

		// Once the user manually edits the slug,
		// title changes will no longer modify it.
		setIsSlugManuallyEdited(true);
	}

	function handleCategoryChange(categoryId: number | null) {
		setForm((previous) => ({
			...previous,
			category_id: categoryId,
			subcategory_id: null,
		}));

		setSubcategories([]);
	}

	function handleCancel() {
		router.push("/admin/posts");
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError("");
		setIsSubmitting(true);

		try {
			if (!form.title.trim()) {
				throw new Error("Title is required.");
			}

			if (!form.slug.trim()) {
				throw new Error("Slug is required.");
			}

			if (!form.category_id) {
				throw new Error("Category is required.");
			}

			if (!form.content.trim()) {
				throw new Error("Content is required.");
			}

			if (form.status === "published" && !form.published_at) {
				throw new Error(
					"Published date is required for published posts.",
				);
			}

			const payload = {
				category_id: form.category_id,
				subcategory_id: form.subcategory_id,
				title: form.title.trim(),
				slug: form.slug.trim(),
				excerpt: form.excerpt.trim(),
				content: form.content,
				content_type: form.content_type,
				status: form.status,
				published_at: formatPublishedAt(form.published_at),
				tags: [...new Set(form.tags)],
			};

			const endpoint = isEditing
				? `/api/admin/posts/${postId}`
				: "/api/admin/posts";

			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(endpoint, {
				method,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(payload),
			});

			const responseText = await response.text();

			let result: any = null;

			try {
				result = responseText ? JSON.parse(responseText) : null;
			} catch {
				console.error(
					"Invalid JSON response from server:",
					responseText,
				);
			}

			if (!response.ok) {
				throw new Error(
					result?.message ||
						`Failed to ${isEditing ? "update" : "create"} post. ` +
							`Server returned ${response.status} ${response.statusText}.`,
				);
			}

			if (!result) {
				throw new Error("Server returned an empty response.");
			}

			const savedPost = result.data;

			// Optional Media Upload
			if (media.file) {
				const mediaFormData = new FormData();

				mediaFormData.append("file", media.file);
				mediaFormData.append("alt_text", media.altText.trim());
				mediaFormData.append("caption", media.caption.trim());

				const mediaResponse = await fetch(
					`/api/admin/posts/${savedPost.id}/media`,
					{
						method: "POST",
						body: mediaFormData,
					},
				);

				if (!mediaResponse.ok) {
					const mediaResult = await mediaResponse.json();

					throw new Error(
						mediaResult?.message || "Failed to upload media.",
					);
				}
			}

			// Save SEO
			const seoPayload = {
				meta_title: form.meta_title.trim(),
				meta_description: form.meta_description.trim(),
				meta_keywords: form.meta_keywords.trim(),
				canonical_url: form.canonical_url.trim(),
				og_title: form.og_title.trim(),
				og_description: form.og_description.trim(),
				og_image: form.og_image.trim(),
			};

			const seoResponse = await fetch(
				`/api/admin/posts/${savedPost.id}/seo`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(seoPayload),
				},
			);

			if (!seoResponse.ok) {
				const seoResult = await seoResponse.json();

				throw new Error(seoResult?.message || "Failed to save SEO.");
			}

			alert(`Post ${isEditing ? "updated" : "created"} successfully.`);

			router.push("/admin/posts");
		} catch (err: any) {
			console.error("Post save error:", err);

			setError(err?.message || "Something went wrong.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			)}

			<PostBasicInfo
				form={form}
				onChange={handleChange}
				onTitleChange={handleTitleChange}
				onSlugChange={handleSlugChange}
			/>

			<PostClassification
				form={form}
				categories={categories}
				subcategories={subcategories}
				tags={tags}
				loadingCategories={loadingCategories}
				loadingSubcategories={loadingSubcategories}
				loadingTags={loadingTags}
				onChange={handleChange}
				onCategoryChange={handleCategoryChange}
			/>

			<PostEditor form={form} onChange={handleChange} />

			<PostMedia media={media} setMedia={setMedia} />

			<PostSeo form={form} onChange={handleChange} />

			<div className="flex items-center justify-end gap-3 rounded-lg border bg-white p-5 shadow-sm">
				<button
					type="button"
					onClick={handleCancel}
					className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Cancel
				</button>

				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting
						? isEditing
							? "Updating..."
							: "Creating..."
						: isEditing
							? "Update Post"
							: "Create Post"}
				</button>
			</div>
		</form>
	);
}
