
import type { Post } from "@/types/post";

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<article className="rounded-lg border p-5">
		</article>
	);
}
