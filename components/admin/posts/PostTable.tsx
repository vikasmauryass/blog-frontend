"use client";

import type { Post } from "@/types/post";
import Link from "next/link";

interface PostTableProps {
	posts: Post[];
	onDelete: (id: number) => void;
	deletingId: number | null;
}

function formatDate(dateString: string | null) {
	if (!dateString) return "-";

	const date = new Date(dateString);

	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();

	return `${day}/${month}/${year}`;
}

function getStatusClass(status: string) {
	switch (status) {
		case "published":
			return "bg-green-100 text-green-700";

		case "draft":
			return "bg-yellow-100 text-yellow-700";

		case "archived":
			return "bg-gray-100 text-gray-700";

		default:
			return "bg-gray-100 text-gray-700";
	}
}

export default function PostTable({
	posts,
	onDelete,
	deletingId,
}: PostTableProps) {
	if (posts.length === 0) {
		return (
			<div className="rounded-lg border bg-white p-10 text-center">
				<h2 className="text-lg font-semibold text-gray-900">
					No posts found
				</h2>

				<p className="mt-2 text-sm text-gray-500">
					Create your first blog post to get started.
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-lg border bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="w-16 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								#
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
								Title
							</th>

							<th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
								Category
							</th>

							<th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
								Type
							</th>

							<th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
								Status
							</th>

							<th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
								Published
							</th>

							<th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{posts.map((post, index) => (
							<tr key={post.id} className="hover:bg-gray-50">
								<td className="px-5 py-4 text-sm text-slate-500">
									{index + 1}
								</td>
								<td className="px-6 py-4">
									<div>
										<p className="font-medium text-gray-900">
											{post.title}
										</p>

										<p className="mt-1 text-xs text-gray-500">
											/{post.slug}
										</p>
									</div>
								</td>

								<td className="px-6 py-4 text-sm text-gray-700">
									{post.category?.name || "-"}
								</td>

								<td className="px-6 py-4 text-sm capitalize text-gray-700">
									{post.content_type}
								</td>

								<td className="px-6 py-4">
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClass(
											post.status,
										)}`}
									>
										{post.status}
									</span>
								</td>

								<td className="px-6 py-4 text-sm text-gray-700">
									{formatDate(post.published_at)}
								</td>

								<td className="px-6 py-4">
									<div className="flex justify-end gap-2">
										<Link
											href={`/admin/posts/${post.id}/edit`}
											className="rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
										>
											Edit
										</Link>

										<button
											type="button"
											onClick={() => onDelete(post.id)}
											disabled={deletingId === post.id}
											className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
										>
											{deletingId === post.id
												? "Deleting..."
												: "Delete"}
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
