"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Post } from "@/types/post";
import PostTable from "./PostTable";

interface PostListProps {
	posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleDelete = async (id: number) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this post?",
		);

		if (!confirmed) {
			return;
		}

		setDeletingId(id);

		try {
			const response = await fetch(`/api/admin/posts/${id}`, {
				method: "DELETE",
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.message || "Failed to delete post.");
			}

			// Refresh the Server Component.
			router.refresh();
		} catch (error: any) {
			console.error("Delete post error:", error);

			alert(error?.message || "Failed to delete post.");
		} finally {
			setDeletingId(null);
		}
	};

	return (
		<PostTable
			posts={posts}
			onDelete={handleDelete}
			deletingId={deletingId}
		/>
	);
}
