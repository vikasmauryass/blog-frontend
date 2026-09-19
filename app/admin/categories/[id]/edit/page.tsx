import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryForm from "@/components/admin/categories/CategoryForm";
import { getCategory } from "@/lib/api/categories";

interface EditCategoryPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditCategoryPage({
	params,
}: EditCategoryPageProps) {
	const { id } = await params;

	const categoryId = Number(id);

	if (!Number.isInteger(categoryId) || categoryId <= 0) {
		notFound();
	}

	try {
		const category = await getCategory(categoryId);

		return (
			<div className="mx-auto max-w-3xl space-y-6">
				<div className="flex items-center gap-2 text-sm">
					<Link
						href="/admin/categories"
						className="text-slate-500 hover:text-blue-600"
					>
						Categories
					</Link>

					<span className="text-slate-300">/</span>

					<span className="text-slate-500">Edit</span>

					<span className="text-slate-300">/</span>

					<span className="text-slate-900">{category.name}</span>
				</div>

				<CategoryForm category={category} />
			</div>
		);
	} catch {
		notFound();
	}
}
