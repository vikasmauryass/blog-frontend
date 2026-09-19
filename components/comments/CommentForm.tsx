"use client";

import { FormEvent, useState } from "react";

interface CommentFormProps {
	postId: number;
	parentId?: number | null;
	onSuccess: () => void;
	onCancel?: () => void;
	placeholder?: string;
}

export default function CommentForm({
	postId,
	parentId = null,
	onSuccess,
	onCancel,
	placeholder = "Write your comment...",
}: CommentFormProps) {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!content.trim()) {
			setError("Comment cannot be empty.");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const response = await fetch(`/api/posts/${postId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: content.trim(),
					parent_id: parentId,
				}),
			});

			const data = await response.json();

			if (response.status === 401) {
				const redirect = encodeURIComponent(window.location.pathname);

				window.location.href = `/login?redirect=${redirect}`;
				return;
			}

			if (!response.ok) {
				throw new Error(data?.message || "Failed to submit comment.");
			}

			setContent("");
			onSuccess();
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Something went wrong.",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-xl border border-slate-200 bg-white p-4"
		>
			<textarea
				value={content}
				onChange={(event) => setContent(event.target.value)}
				placeholder={placeholder}
				rows={4}
				maxLength={5000}
				disabled={loading}
				className="w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-slate-500"
			/>

			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}

			<div className="mt-3 flex items-center justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						disabled={loading}
						className="min-h-10 rounded-lg px-4 text-sm text-slate-600 hover:bg-slate-100"
					>
						Cancel
					</button>
				)}

				<button
					type="submit"
					disabled={loading || !content.trim()}
					className="min-h-10 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "Posting..." : parentId ? "Reply" : "Comment"}
				</button>
			</div>
		</form>
	);
}
