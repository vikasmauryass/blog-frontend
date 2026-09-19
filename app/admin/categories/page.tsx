import CategoryTable from "@/components/admin/categories/CategoryTable";
import Pagination from "@/components/admin/Pagination";
import { getCategories } from "@/lib/api/categories";
import Link from "next/link";

interface CategoriesPageProps {
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function CategoriesPage({
	searchParams,
}: CategoriesPageProps) {
	const params = await searchParams;

	const pageNumber = Number(params.page || "1");

	const currentPage =
		Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

	const response = await getCategories(currentPage);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-slate-900">
						Categories
					</h1>

					<p className="mt-1 text-sm text-slate-500">
						Create and manage your blog categories.
					</p>
				</div>

				<Link
					href="/admin/categories/create"
					className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					+ Add Category
				</Link>
			</div>

			{/* Table */}
			<CategoryTable
				categories={response.data}
				total={response.meta.total}
			/>

			{/* Pagination */}
			<Pagination
				currentPage={response.meta.current_page}
				lastPage={response.meta.last_page}
				basePath="/admin/categories"
			/>
		</div>
	);
}
