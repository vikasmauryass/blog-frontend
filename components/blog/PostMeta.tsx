import type { Post } from "@/types/post";

interface PostMetaProps {
	post: Post;
}

export default function PostMeta({ post }: PostMetaProps) {
	return (
		<div className="mt-6 flex flex-wrap items-center gap-2">
			{/* Subcategory */}
			{post.subcategory && (
				<span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
					{post.subcategory.name}
				</span>
			)}

			{/* Tags */}
			{post.tags?.map((tag) => (
				<span
					key={tag.id}
					className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
				>
					#{tag.name}
				</span>
			))}
		</div>
	);
}
