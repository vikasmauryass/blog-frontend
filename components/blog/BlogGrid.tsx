import type { Post } from "@/types/post";
import BlogCard from "./BlogCard";

interface BlogGridProps {
	posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
	if (!posts.length) {
		return (
			<div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
				<h2 className="text-lg font-semibold text-slate-900">
					No blogs found
				</h2>

				<p className="mt-2 text-sm text-slate-500">
					There are no published articles available right now.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
			{posts.map((post) => (
				<BlogCard key={post.id} post={post} />
			))}
		</div>
	);
}
