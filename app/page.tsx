import { getPosts } from "@/lib/api/posts";

export default async function HomePage() {
	const posts = await getPosts();

	return (
		<main>
			<h1>Laravel API Connected</h1>

			<pre>{JSON.stringify(posts, null, 2)}</pre>
		</main>
	);
}
