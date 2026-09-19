"use client";

import type { PostFormData } from "@/types/post";

interface PostEditorProps {
	form: PostFormData;
	onChange: (field: keyof PostFormData, value: string) => void;
}

export default function PostEditor({ form, onChange }: PostEditorProps) {
	return (
		<section className="rounded-lg border bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">Content</h2>

				<p className="mt-1 text-sm text-gray-500">
					Write the main content of your post.
				</p>
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Post Content
				</label>

				<textarea
					value={form.content}
					onChange={(e) => onChange("content", e.target.value)}
					placeholder="<h2>Introduction</h2><p>Write your content...</p>"
					rows={18}
					className="w-full rounded-md border border-gray-300 px-3 py-3 font-mono text-sm outline-none focus:border-blue-500"
				/>

				<p className="mt-2 text-xs text-gray-500">
					The backend currently stores the content as HTML.
				</p>
			</div>
		</section>
	);
}
