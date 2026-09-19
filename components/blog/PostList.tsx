import type { Post } from "@/types/post";


interface PostListProps {
	posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
	if (posts.length === 0) {
		return <p className="text-gray-500">No posts found.</p>;
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{/* {posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))} */}
			testingsndklsdlfalsk
		</div>
	);
}
