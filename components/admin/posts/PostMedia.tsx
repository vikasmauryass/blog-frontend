"use client";

import type { PostMediaForm } from "@/types/media";

interface PostMediaProps {
	media: PostMediaForm;
	setMedia: React.Dispatch<React.SetStateAction<PostMediaForm>>;
}

export default function PostMedia({ media, setMedia }: PostMediaProps) {
	return (
		<section className="rounded-lg border bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">Media</h2>

				<p className="mt-1 text-sm text-gray-500">
					Upload an image or video for this post.
				</p>
			</div>

			<div className="space-y-5">
				{/* File */}
				<div>
					<label
						htmlFor="media_file"
						className="mb-2 block text-sm font-medium text-gray-700"
					>
						File
					</label>

					<input
						id="media_file"
						type="file"
						accept="image/*,video/*"
						onChange={(e) => {
							const file = e.target.files?.[0] ?? null;

							setMedia((prev) => ({
								...prev,
								file,
							}));
						}}
						className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
					/>

					{media.file && (
						<p className="mt-2 text-sm text-gray-500">
							Selected: {media.file.name}
						</p>
					)}
				</div>

				{/* Alt Text */}
				<div>
					<label
						htmlFor="alt_text"
						className="mb-2 block text-sm font-medium text-gray-700"
					>
						Alt Text
					</label>

					<input
						id="alt_text"
						type="text"
						value={media.altText}
						onChange={(e) =>
							setMedia((prev) => ({
								...prev,
								altText: e.target.value,
							}))
						}
						placeholder="Describe the image"
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				{/* Caption */}
				<div>
					<label
						htmlFor="caption"
						className="mb-2 block text-sm font-medium text-gray-700"
					>
						Caption
					</label>

					<textarea
						id="caption"
						value={media.caption}
						onChange={(e) =>
							setMedia((prev) => ({
								...prev,
								caption: e.target.value,
							}))
						}
						placeholder="Enter media caption"
						rows={3}
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</div>
			</div>
		</section>
	);
}
