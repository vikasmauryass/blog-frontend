// E:\Blog_Website\blog-frontend\app\admin\posts\[id]\edit\page.tsx

import PostForm from "@/components/admin/posts/PostForm";
import { getAdminPost } from "@/lib/api/posts";
import { getAuthenticatedUser } from "@/lib/server/auth";
import { notFound, redirect } from "next/navigation";

interface EditPostPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
	const { id } = await params;
	const postId = Number(id);

	if (!Number.isInteger(postId) || postId <= 0) {
		notFound();
	}

	const auth = await getAuthenticatedUser();
	if (!auth) {
		redirect("/login");
	}

	const post = await getAdminPost(postId, auth.token);

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="mx-auto max-w-7xl px-6 py-8">
				<h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
				<p className="mt-1 text-sm text-gray-500">
					Editing: {post.title}
				</p>

				<div className="mt-8">
					{/* Pass fetched data to make it pre-filled */}
					<PostForm initialData={post} postId={postId} />
				</div>
			</div>
		</div>
	);
}
