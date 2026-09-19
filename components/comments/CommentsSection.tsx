"use client";

import { useCallback, useEffect, useState } from "react";

import type { Comment } from "@/types/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentsSectionProps {
	postId: number;
}

interface CommentsState {
	data: Comment[];
	currentPage: number;
	lastPage: number;
	total: number;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
	const [comments, setComments] = useState<CommentsState>({
		data: [],
		currentPage: 1,
		lastPage: 1,
		total: 0,
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchComments = useCallback(
		async (page = 1) => {
			try {
				setLoading(true);
				setError("");

				const response = await fetch(
					`/api/posts/${postId}/comments?page=${page}`,
					{
						cache: "no-store",
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data?.message || "Failed to load comments.",
					);
				}

				setComments({
					data: data.data || [],
					currentPage: data.meta.current_page,
					lastPage: data.meta.last_page,
					total: data.meta.total,
				});
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to load comments.",
				);
			} finally {
				setLoading(false);
			}
		},
		[postId],
	);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return (
		<section className="mt-10">
			<div className="mb-6">
				<h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
					Comments
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					{comments.total}{" "}
					{comments.total === 1 ? "comment" : "comments"}
				</p>
			</div>

			<div className="mb-6">
				<CommentForm
					postId={postId}
					onSuccess={() => fetchComments(1)}
				/>
			</div>

			{loading && (
				<p className="text-sm text-slate-500">Loading comments...</p>
			)}

			{error && (
				<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
					{error}
				</div>
			)}

			{!loading && !error && comments.data.length === 0 && (
				<div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
					<p className="text-sm text-slate-500">
						No comments yet. Be the first to comment.
					</p>
				</div>
			)}

			{!loading && !error && comments.data.length > 0 && (
				<div className="space-y-4">
					{comments.data.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
							postId={postId}
							onRefresh={() =>
								fetchComments(comments.currentPage)
							}
						/>
					))}
				</div>
			)}

			{comments.lastPage > 1 && (
				<div className="mt-6 flex items-center justify-between">
					<button
						type="button"
						disabled={loading || comments.currentPage === 1}
						onClick={() => fetchComments(comments.currentPage - 1)}
						className="min-h-10 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-40"
					>
						Previous
					</button>

					<span className="text-sm text-slate-500">
						Page {comments.currentPage} of {comments.lastPage}
					</span>

					<button
						type="button"
						disabled={
							loading ||
							comments.currentPage === comments.lastPage
						}
						onClick={() => fetchComments(comments.currentPage + 1)}
						className="min-h-10 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-40"
					>
						Next
					</button>
				</div>
			)}
		</section>
	);
}
