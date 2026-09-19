import CategoryForm from "@/components/admin/categories/CategoryForm";
import Link from "next/link";

export default function CreateCategoryPage() {
	return (
		<div className="mx-auto max-w-3xl space-y-6">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 text-sm">
				<Link
					href="/admin/categories"
					className="text-slate-500 hover:text-blue-600"
				>
					Categories
				</Link>

				<span className="text-slate-300">/</span>

				<span className="text-slate-900">Create</span>
			</div>

			<CategoryForm />
		</div>
	);
}
