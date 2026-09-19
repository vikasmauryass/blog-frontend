import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategories } from "@/lib/api/categories";
import { getSubcategory } from "@/lib/api/subcategories";

import SubcategoryForm from "@/components/admin/subcategories/SubcategoryForm";

interface EditSubcategoryPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditSubcategoryPage({
	params,
}: EditSubcategoryPageProps) {
	const { id } = await params;

	const subcategoryId = Number(id);

	if (!Number.isInteger(subcategoryId) || subcategoryId <= 0) {
		notFound();
	}

	try {
		const [subcategory, categoriesResponse] = await Promise.all([
			getSubcategory(subcategoryId),
			getCategories(),
		]);

		return (
			<div className="mx-auto max-w-3xl space-y-6">
				<div className="flex items-center gap-2 text-sm">
					<Link
						href="/admin/subcategories"
						className="text-slate-500 hover:text-blue-600"
					>
						Subcategories
					</Link>

					<span className="text-slate-300">/</span>

					<span className="text-slate-500">Edit</span>

					<span className="text-slate-300">/</span>

					<span className="text-slate-900">{subcategory.name}</span>
				</div>

				<SubcategoryForm
					categories={categoriesResponse.data}
					subcategory={subcategory}
				/>
			</div>
		);
	} catch {
		notFound();
	}
}
