interface AuthHeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

export default function AuthHeader({
	eyebrow,
	title,
	description,
}: AuthHeaderProps) {
	return (
		<div className="mb-7">
			<p className="mb-2 text-sm font-semibold text-blue-600">
				{eyebrow}
			</p>

			<h2 className="text-2xl font-bold tracking-tight text-slate-950">
				{title}
			</h2>

			<p className="mt-2 text-sm leading-6 text-slate-500">
				{description}
			</p>
		</div>
	);
}
