"use client";

import type { PostFormData } from "@/types/post";

interface PostBasicInfoProps {
	form: PostFormData;
	onChange: (
		field: keyof PostFormData,
		value: string | number | number[] | null,
	) => void;
	onTitleChange: (value: string) => void;
	onSlugChange: (value: string) => void;
}

export default function PostBasicInfo({
	form,
	onChange,
	onTitleChange,
	onSlugChange,
}: PostBasicInfoProps) {
	return (
		<section className="rounded-lg border bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">
					Basic Information
				</h2>

				<p className="mt-1 text-sm text-gray-500">
					Enter the main information about your post.
				</p>
			</div>

			<div className="space-y-5">
				{/* Title */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">
						Title
					</label>

					<input
						type="text"
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						placeholder="Enter post title"
						className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
					/>
				</div>

				{/* Slug */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">
						Slug
					</label>

					<input
						type="text"
						value={form.slug}
						onChange={(event) => onSlugChange(event.target.value)}
						placeholder="post-slug"
						className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
					/>

					<p className="mt-1 text-xs text-gray-500">
						Used in the public blog URL.
					</p>
				</div>

				{/* Excerpt */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">
						Excerpt
					</label>

					<textarea
						value={form.excerpt}
						onChange={(e) => onChange("excerpt", e.target.value)}
						placeholder="Short description of the post"
						rows={4}
						className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
					/>
				</div>

				{/* Content type + status */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Content Type
						</label>

						<select
							value={form.content_type}
							onChange={(e) =>
								onChange("content_type", e.target.value)
							}
							className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
						>
							<option value="article">Article</option>
							<option value="video">Video</option>
							<option value="mixed">Mixed</option>
						</select>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Status
						</label>

						<select
							value={form.status}
							onChange={(e) => onChange("status", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>
				</div>

				{/* Published At */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">
						Published At
					</label>

					<input
						type="datetime-local"
						value={form.published_at}
						onChange={(e) =>
							onChange("published_at", e.target.value)
						}
						className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
					/>

					<p className="mt-1 text-xs text-gray-500">
						Required when publishing a post.
					</p>
				</div>
			</div>
		</section>
	);
}
