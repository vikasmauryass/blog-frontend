import Link from "next/link";

import { getCategories } from "@/lib/api/categories";

import SubcategoryForm from "@/components/admin/subcategories/SubcategoryForm";

export default async function CreateSubcategoryPage() {
  const response = await getCategories();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/subcategories"
          className="text-slate-500 hover:text-blue-600"
        >
          Subcategories
        </Link>

        <span className="text-slate-300">
          /
        </span>

        <span className="text-slate-900">
          Create
        </span>
      </div>

      <SubcategoryForm
        categories={response.data}
      />
    </div>
  );
}