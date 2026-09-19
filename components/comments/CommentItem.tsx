"use client";

import { useState } from "react";

import type { Comment } from "@/types/comment";
import CommentForm from "./CommentForm";

interface CommentItemProps {
	comment: Comment;
	postId: number;
	onRefresh: () => void;
}

export default function CommentItem({
	comment,
	postId,
	onRefresh,
}: CommentItemProps) {
	const [showReply, setShowReply] = useState(false);

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="font-semibold text-slate-900">
						{comment.author.name}
					</p>

					<p className="mt-1 text-xs text-slate-500">
						{new Date(comment.created_at).toLocaleString()}
					</p>
				</div>

				<button
					type="button"
					onClick={() => setShowReply((value) => !value)}
					className="min-h-10 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
				>
					{showReply ? "Cancel" : "Reply"}
				</button>
			</div>

			<p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
				{comment.content}
			</p>

			{showReply && (
				<div className="mt-4">
					<CommentForm
						postId={postId}
						parentId={comment.id}
						placeholder={`Reply to ${comment.author.name}...`}
						onSuccess={() => {
							setShowReply(false);
							onRefresh();
						}}
						onCancel={() => setShowReply(false)}
					/>
				</div>
			)}

			{comment.replies?.length > 0 && (
				<div className="mt-5 space-y-3 border-l-2 border-slate-200 pl-4 sm:ml-5">
					{comment.replies.map((reply) => (
						<CommentItem
							key={reply.id}
							comment={reply}
							postId={postId}
							onRefresh={onRefresh}
						/>
					))}
				</div>
			)}
		</div>
	);
}
