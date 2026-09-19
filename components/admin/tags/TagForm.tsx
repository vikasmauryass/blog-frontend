"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import type { Tag } from "@/types/tag";

interface TagFormProps {
	tag?: Tag;
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

export default function TagForm({ tag }: TagFormProps) {
	const router = useRouter();

	const isEdit = Boolean(tag);

	const [name, setName] = useState(tag?.name || "");
	const [slug, setSlug] = useState(tag?.slug || "");

	// In edit mode, preserve the existing slug until the user
	// manually changes it.
	const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEdit);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");

		if (!name.trim()) {
			setError("Tag name is required.");
			return;
		}

		setLoading(true);

		try {
			const payload = {
				name: name.trim(),
				slug: slug.trim() || undefined,
			};

			const url = isEdit
				? `/api/admin/tags/${tag.id}`
				: "/api/admin/tags";

			const response = await fetch(url, {
				method: isEdit ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.message || "Something went wrong.");
			}

			router.push("/admin/tags");
			router.refresh();
		} catch (err: any) {
			setError(err?.message || "Failed to save tag.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
			<div className="rounded-xl border bg-white p-6 shadow-sm">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-slate-900">
						{isEdit ? "Edit Tag" : "Create Tag"}
					</h2>

					<p className="mt-1 text-sm text-slate-500">
						{isEdit
							? "Update the tag information."
							: "Create a new tag for your blog posts."}
					</p>
				</div>

				{error && (
					<div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<div className="space-y-5">
					{/* Tag Name */}
					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-sm font-medium text-slate-700"
						>
							Tag Name
						</label>

						<input
							id="name"
							type="text"
							value={name}
							onChange={(event) => {
								const value = event.target.value;

								setName(value);

								// Automatically generate slug only while
								// the user has not manually edited it.
								if (!isSlugManuallyEdited) {
									setSlug(generateSlug(value));
								}
							}}
							placeholder="Enter tag name"
							className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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

								// Once the user manually changes the slug,
								// stop automatic slug generation.
								setIsSlugManuallyEdited(true);
							}}
							placeholder="example-tag"
							className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
						/>

						<p className="mt-2 text-xs text-slate-500">
							Automatically generated from the tag name. You can
							edit it manually if needed.
						</p>
					</div>
				</div>

				<div className="mt-8 flex items-center gap-3">
					<button
						type="submit"
						disabled={loading}
						className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading
							? "Saving..."
							: isEdit
								? "Update Tag"
								: "Create Tag"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/admin/tags")}
						className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
}
