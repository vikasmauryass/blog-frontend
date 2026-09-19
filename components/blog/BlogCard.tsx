import type { Post } from "@/types/post";
import Link from "next/link";

interface BlogCardProps {
	post: Post;
}

function formatDate(dateString: string | null) {
	if (!dateString) return "-";

	const date = new Date(dateString);

	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();

	return `${day}/${month}/${year}`;
}

// function getPostImage(post: Post) {
// 	return post.media?.find((media) => media.mime_type?.startsWith("image/"))
// 		?.url;
// }

export default function BlogCard({ post }: BlogCardProps) {
	// const imageUrl = getPostImage(post);

	const image = post.media?.find((media) =>
		media.mime_type?.startsWith("image/"),
	);
	const imageUrl = image?.url;
	const imageAlt = image?.alt_text || post.title;

	return (
		<article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
			{/* Image */}
			<Link href={`/blog/${post.slug}`} className="block overflow-hidden">
				<div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={imageAlt}
							className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
							No image available
						</div>
					)}

					{/* Content Type */}
					<div className="absolute left-3 top-3">
						<span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm">
							{post.content_type}
						</span>
					</div>
				</div>
			</Link>

			{/* Content */}
			<div className="p-4 sm:p-5">
				{/* Category */}
				{post.category && (
					<Link
						href={`/category/${post.category.slug}`}
						className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700"
					>
						{post.category.name}
					</Link>
				)}

				{/* Title */}
				<h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
					<Link
						href={`/blog/${post.slug}`}
						className="transition hover:text-blue-600"
					>
						{post.title}
					</Link>
				</h2>

				{/* Excerpt */}
				{post.excerpt && (
					<p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
						{post.excerpt}
					</p>
				)}

				{/* Author + Date */}
				<div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
					<div className="min-w-0">
						<p className="truncate text-xs font-medium text-slate-700">
							{post.author?.name || "Admin"}
						</p>

						<p className="mt-1 text-xs text-slate-500">
							{formatDate(post.published_at || post.created_at)}
						</p>
					</div>

					{/* Read More */}
					<Link
						href={`/blog/${post.slug}`}
						className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 sm:px-4 sm:text-sm"
					>
						Read More
					</Link>
				</div>
			</div>
		</article>
	);
}
