import { notFound } from "next/navigation";

import PostContent from "@/components/blog/PostContent";
import PostHero from "@/components/blog/PostHero";
import PostMeta from "@/components/blog/PostMeta";
import CommentsSection from "@/components/comments/CommentsSection";
import LikeButton from "@/components/likes/LikeButton";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { getPostBySlug } from "@/lib/api/posts";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: BlogDetailPageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const post = await getPostBySlug(slug);

		return {
			title: post.seo?.meta_title || post.title,

			description:
				post.seo?.meta_description || post.excerpt || undefined,

			keywords: post.seo?.meta_keywords
				?.split(",")
				.map((keyword) => keyword.trim())
				.filter(Boolean),

			alternates: post.seo?.canonical_url
				? {
						canonical: post.seo.canonical_url,
					}
				: undefined,

			openGraph: {
				title: post.seo?.og_title || post.title,

				description:
					post.seo?.og_description || post.excerpt || undefined,

				images: post.seo?.og_image ? [post.seo.og_image] : undefined,

				type: "article",
			},
		};
	} catch {
		return {
			title: "Blog",
		};
	}
}

interface BlogDetailPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function BlogDetailPage({
	params,
}: BlogDetailPageProps) {
	const { slug } = await params;

	let post;

	try {
		post = await getPostBySlug(slug);
	} catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as { status: unknown }).status === 404
    ) {
      notFound();
    }

    throw error;
  }

	return (
		<main className="min-h-screen bg-slate-50">
			<div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
				<article className="rounded-2xl bg-white p-4 shadow-sm sm:p-7 lg:p-10">
					{/* Hero */}
					<PostHero post={post} />

					{/* Tags / Subcategory */}
					<PostMeta post={post} />

					{/* Divider */}
					<div className="my-7 border-t border-slate-200 sm:my-9" />

					{/* Article */}
					<PostContent content={post.content} />

					<div className="mt-8 border-t border-slate-200 pt-6">
						<LikeButton postId={post.id} />
					</div>

					<ReviewsSection postId={post.id} />

					<CommentsSection postId={post.id} />
				</article>
			</div>
		</main>
	);
}