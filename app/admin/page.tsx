export default function AdminDashboardPage() {
	return (
		<div className="space-y-8">
			{/* Page heading */}
			<div>
				<h2 className="text-2xl font-bold tracking-tight text-slate-900">
					Dashboard
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					Welcome to your BlogSpace administration panel.
				</p>
			</div>

			{/* Stats */}
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					title="Total Posts"
					value="0"
					description="Published and draft posts"
				/>

				<StatCard
					title="Categories"
					value="0"
					description="Blog categories"
				/>

				<StatCard
					title="Subcategories"
					value="0"
					description="Blog subcategories"
				/>

				<StatCard title="Tags" value="0" description="Content tags" />
			</div>

			{/* Quick actions */}
			<div>
				<h3 className="text-lg font-semibold text-slate-900">
					Quick Actions
				</h3>

				<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<QuickAction
						title="Create Post"
						description="Write and publish a new blog post."
						href="/admin/posts/create"
					/>

					<QuickAction
						title="Add Category"
						description="Create a new content category."
						href="/admin/categories/create"
					/>

					<QuickAction
						title="Add Subcategory"
						description="Create a subcategory under a category."
						href="/admin/subcategories/create"
					/>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	title,
	value,
	description,
}: {
	title: string;
	value: string;
	description: string;
}) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<p className="text-sm font-medium text-slate-500">{title}</p>

			<p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

			<p className="mt-1 text-xs text-slate-400">{description}</p>
		</div>
	);
}

function QuickAction({
	title,
	description,
	href,
}: {
	title: string;
	description: string;
	href: string;
}) {
	return (
		<a
			href={href}
			className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
		>
			<h4 className="font-semibold text-slate-900 group-hover:text-blue-600">
				{title}
			</h4>

			<p className="mt-2 text-sm leading-6 text-slate-500">
				{description}
			</p>

			<span className="mt-4 inline-block text-sm font-medium text-blue-600">
				Get started →
			</span>
		</a>
	);
}
