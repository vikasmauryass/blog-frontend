interface PostContentProps {
	content: string | null;
}

export default function PostContent({ content }: PostContentProps) {
	if (!content) {
		return (
			<p className="text-sm text-slate-500">
				No article content available.
			</p>
		);
	}

	return (
		<div
			className="
				prose
				prose-slate
				max-w-none

				prose-headings:font-bold
				prose-headings:text-slate-900

				prose-p:text-slate-700
				prose-p:leading-7

				prose-a:text-blue-600
				prose-a:no-underline
				hover:prose-a:underline

				prose-img:rounded-xl
				prose-img:w-full

				prose-pre:overflow-x-auto
				prose-pre:rounded-xl

				prose-code:text-sm

				prose-li:text-slate-700

				sm:prose-lg
			"
			dangerouslySetInnerHTML={{
				__html: content,
			}}
		/>
	);
}
