import type { Post } from "@/types/post";
import Link from "next/link";

interface PostHeroProps {
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

export default function PostHero({ post }: PostHeroProps) {
	const image = post.media?.find((media) =>
		media.mime_type?.startsWith("image/"),
	);

	const imageUrl = image?.url;
	const imageAlt = image?.alt_text || post.title;

	return (
		<header>
			{/* Breadcrumb */}
			<nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
				<Link href="/blog" className="hover:text-blue-600">
					Blog
				</Link>

				<span>/</span>

				{post.category && (
					<Link
						href={`/category/${post.category.slug}`}
						className="hover:text-blue-600"
					>
						{post.category.name}
					</Link>
				)}
			</nav>

			{/* Category */}
			{post.category && (
				<p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
					{post.category.name}
				</p>
			)}

			{/* Title */}
			<h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
				{post.title}
			</h1>

			{/* Excerpt */}
			{post.excerpt && (
				<p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
					{post.excerpt}
				</p>
			)}

			{/* Author / Date */}
			<div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
				<span>
					By{" "}
					<strong className="font-semibold text-slate-700">
						{post.author?.name || "Admin"}
					</strong>
				</span>

				<span className="hidden sm:inline">•</span>

				<span>{formatDate(post.published_at || post.created_at)}</span>

				<span className="hidden sm:inline">•</span>

				<span className="capitalize">{post.content_type}</span>
			</div>

			{/* Featured Image */}
			{imageUrl && (
				<div className="mt-7 overflow-hidden rounded-2xl bg-slate-100 sm:mt-9">
					<img
						src={imageUrl}
						alt={imageAlt}
						className="h-auto max-h-[600px] w-full object-cover"
					/>
				</div>
			)}
		</header>
	);
}
