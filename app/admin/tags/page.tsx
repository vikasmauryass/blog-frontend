import Link from "next/link";

import Pagination from "@/components/admin/Pagination";
import TagTable from "@/components/admin/tags/TagTable";
import { getTags } from "@/lib/api/tags";

interface TagsPageProps {
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
	const params = await searchParams;

	const pageNumber = Number(params.page || "1");

	const currentPage =
		Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

	const response = await getTags(currentPage);

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-slate-900">
						Tags
					</h1>

					<p className="mt-1 text-sm text-slate-500">
						Manage tags used for your blog posts.
					</p>
				</div>

				<Link
					href="/admin/tags/create"
					className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					+ Add Tag
				</Link>
			</div>

			<TagTable tags={response.data} total={response.meta.total} />

			<Pagination
				currentPage={response.meta.current_page}
				lastPage={response.meta.last_page}
				basePath="/admin/tags"
			/>
		</div>
	);
}
