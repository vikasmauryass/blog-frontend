import Pagination from "@/components/admin/Pagination";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogHeader from "@/components/blog/BlogHeader";

import { getPosts, searchPosts } from "@/lib/api/posts";

interface BlogPageProps {
	searchParams: Promise<{
		page?: string;
		search?: string;
		category_slug?: string;
		subcategory_slug?: string;
		tag_slug?: string;
	}>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const params = await searchParams;

	const page = Number(params.page || "1");

	const currentPage = Number.isInteger(page) && page > 0 ? page : 1;

	const search = params.search?.trim() || "";
	const categorySlug = params.category_slug || "";
	const subcategorySlug = params.subcategory_slug || "";
	const tagSlug = params.tag_slug || "";

	const hasFilters = search || categorySlug || subcategorySlug || tagSlug;

	const response = hasFilters
		? await searchPosts({
				search: search || undefined,
				category_slug: categorySlug || undefined,
				subcategory_slug: subcategorySlug || undefined,
				tag_slug: tagSlug || undefined,
				page: currentPage,
			})
		: await getPosts(currentPage);

	return (
		<main className="min-h-screen bg-slate-50">
			<div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-2">
				{/* Header + Filters */}
				<div className="mb-1 flex flex-col gap-25 lg:flex-row lg:items-center lg:justify-between">
					{/* Blog Heading */}
					<div className="shrink-0">
						<BlogHeader />
					</div>

					{/* Search + Filters */}
					<div className="min-w-0 flex-1 lg:max-w-md">
						<BlogFilterBar />
					</div>
				</div>

				{/* Search Result Count */}
				{hasFilters && (
					<div className="mb-4 text-xs text-slate-600 sm:text-sm">
						Showing{" "}
						<span className="font-medium text-slate-900">
							{response.meta.total}
						</span>{" "}
						result
						{response.meta.total !== 1 ? "s" : ""}
					</div>
				)}

				{/* Posts */}
				<BlogGrid posts={response.data} />

				{/* Pagination */}
				<div className="mt-6 sm:mt-8">
					<Pagination
						currentPage={response.meta.current_page}
						lastPage={response.meta.last_page}
						basePath="/blog"
						queryParams={{
							search,
							category_slug: categorySlug,
							subcategory_slug: subcategorySlug,
							tag_slug: tagSlug,
						}}
					/>
				</div>
			</div>
		</main>
	);
}
