"use client";

import Link from "next/link";
import { useState } from "react";

import type { Tag } from "@/types/tag";

interface TagTableProps {
	tags: Tag[];
	total: number;
}

export default function TagTable({ tags, total }: TagTableProps) {
	const [deletingId, setDeletingId] = useState<number | null>(null);

	async function handleDelete(id: number) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this tag?",
		);

		if (!confirmed) return;

		try {
			setDeletingId(id);

			// Keep your existing delete API logic here.
			// Example:
			//
			// await deleteTag(id);

			window.location.reload();
		} catch (error) {
			console.error("Failed to delete tag:", error);
			alert("Failed to delete tag.");
		} finally {
			setDeletingId(null);
		}
	}

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			{/* Table header / count */}
			<div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-sm font-semibold text-slate-900">
						All Tags
					</h2>

					<p className="mt-1 text-xs text-slate-500">
						Manage tags used across your blog posts.
					</p>
				</div>

				<div className="text-xs text-slate-500">
					Total:{" "}
					<span className="font-semibold text-slate-700">
						{total}
					</span>
				</div>
			</div>

			{/* Responsive table */}
			<div className="overflow-x-auto">
				<table className="w-full min-w-[700px] text-left">
					<thead className="border-b border-slate-200 bg-slate-50">
						<tr>
							<th className="w-16 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								#
							</th>

							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								Tag
							</th>

							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								Slug
							</th>

							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								Created
							</th>

							<th className="w-32 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-100">
						{tags.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="px-5 py-10 text-center text-sm text-slate-500"
								>
									No tags found.
								</td>
							</tr>
						) : (
							tags.map((tag, index) => (
								<tr
									key={tag.id}
									className="transition hover:bg-slate-50"
								>
									<td className="px-5 py-4 text-sm text-slate-500">
										{index + 1}
									</td>

									<td className="px-5 py-4">
										<div className="font-medium text-slate-900">
											{tag.name}
										</div>
									</td>

									<td className="px-5 py-4">
										<span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
											{tag.slug}
										</span>
									</td>

									<td className="px-5 py-4 text-sm text-slate-500">
										{new Date(
											tag.created_at,
										).toLocaleDateString("en-IN", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</td>

									<td className="px-5 py-4">
										<div className="flex items-center justify-end gap-2">
											<Link
												href={`/admin/tags/${tag.id}/edit`}
												className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
											>
												Edit
											</Link>

											<button
												type="button"
												disabled={deletingId === tag.id}
												onClick={() =>
													handleDelete(tag.id)
												}
												className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
											>
												{deletingId === tag.id
													? "Deleting..."
													: "Delete"}
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
