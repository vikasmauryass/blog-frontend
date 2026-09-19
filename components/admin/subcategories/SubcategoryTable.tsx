"use client";

import Link from "next/link";
import { useState } from "react";

import type { Subcategory } from "@/types/subcategory";

import DeleteSubcategoryButton from "./DeleteSubcategoryButton";

interface SubcategoryTableProps {
	subcategories: Subcategory[];
	total: number;
}

export default function SubcategoryTable({
	subcategories,
	total,
}: SubcategoryTableProps) {
	const [search, setSearch] = useState("");

	const filteredSubcategories = subcategories.filter((subcategory) => {
		const value = search.toLowerCase();

		return (
			subcategory.name.toLowerCase().includes(value) ||
			subcategory.slug.toLowerCase().includes(value) ||
			subcategory.category.name.toLowerCase().includes(value)
		);
	});

	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			{/* Toolbar */}
			<div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-slate-900">
						All Subcategories
					</p>

					<p className="text-xs text-slate-500">
						{total} {total === 1 ? "subcategory" : "subcategories"}
					</p>
				</div>

				<div className="w-full sm:w-72">
					<input
						type="text"
						placeholder="Search subcategories..."
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>
				</div>
			</div>

			{/* Empty state */}
			{filteredSubcategories.length === 0 ? (
				<div className="px-6 py-12 text-center">
					<p className="font-medium text-slate-900">
						No subcategories found
					</p>

					<p className="mt-1 text-sm text-slate-500">
						Try a different search term.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full min-w-[850px] text-left">
						<thead className="bg-slate-50">
							<tr className="border-b border-slate-200">
								<th className="w-16 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
									#
								</th>
								<th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
									Name
								</th>

								<th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
									Category
								</th>

								<th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
									Slug
								</th>

								<th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
									Status
								</th>

								<th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-slate-100">
							{filteredSubcategories.map((subcategory, index) => (
								<tr
									key={subcategory.id}
									className="transition hover:bg-slate-50"
								>
									<td className="px-5 py-4 text-sm text-slate-500">
										{index + 1}
									</td>
									<td className="px-6 py-4">
										<p className="font-semibold text-slate-900">
											{subcategory.name}
										</p>

										<p className="mt-1 max-w-xs truncate text-xs text-slate-400">
											{subcategory.description ||
												"No description"}
										</p>
									</td>

									<td className="px-6 py-4">
										<span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
											{subcategory.category.name}
										</span>
									</td>

									<td className="px-6 py-4">
										<code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
											{subcategory.slug}
										</code>
									</td>

									<td className="px-6 py-4">
										<StatusBadge
											status={subcategory.status}
										/>
									</td>

									<td className="px-6 py-4">
										<div className="flex justify-end gap-2">
											<Link
												href={`/admin/subcategories/${subcategory.id}/edit`}
												className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
											>
												Edit
											</Link>

											<DeleteSubcategoryButton
												subcategoryId={subcategory.id}
												subcategoryName={
													subcategory.name
												}
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

function StatusBadge({ status }: { status: boolean }) {
	return (
		<span
			className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
				status ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
			}`}
		>
			{status ? "Active" : "Inactive"}
		</span>
	);
}
