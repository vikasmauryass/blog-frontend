import Link from "next/link";

import { getPosts } from "@/lib/api/posts";

import Pagination from "@/components/admin/Pagination";
import PostList from "@/components/admin/posts/PostList";

interface AdminPostsPageProps {
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function AdminPostsPage({
	searchParams,
}: AdminPostsPageProps) {
	const params = await searchParams;

	const page = Number(params.page || "1");

	const currentPage = Number.isInteger(page) && page > 0 ? page : 1;

	const response = await getPosts(currentPage);

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="mx-auto max-w-7xl px-6 py-8">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							Posts
						</h1>

						<p className="mt-1 text-sm text-gray-500">
							Manage your blog posts.
						</p>
					</div>

					<Link
						href="/admin/posts/create"
						className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
					>
						+ Create Post
					</Link>
				</div>

				{/* Post List */}
				<PostList posts={response.data} />

				{/* Pagination */}
				<Pagination
					currentPage={response.meta.current_page}
					lastPage={response.meta.last_page}
					basePath="/admin/posts"
				/>
			</div>
		</div>
	);
}
