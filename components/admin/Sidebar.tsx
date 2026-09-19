"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{
		label: "Dashboard",
		href: "/admin",
	},
	{
		label: "Posts",
		href: "/admin/posts",
	},
	{
		label: "Categories",
		href: "/admin/categories",
	},
	{
		label: "Subcategories",
		href: "/admin/subcategories",
	},
	{
		label: "Tags",
		href: "/admin/tags",
	},
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
			<div className="sticky top-0 flex h-screen flex-col">
				{/* Logo */}
				<div className="flex h-16 items-center border-b border-slate-200 px-6">
					<Link
						href="/admin"
						className="text-xl font-bold tracking-tight text-slate-900"
					>
						Blog<span className="text-blue-600">Space</span>
					</Link>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto px-3 py-6">
					<p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
						Overview
					</p>

					<NavItem
						href="/admin"
						label="Dashboard"
						active={pathname === "/admin"}
					/>

					<p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
						Content
					</p>

					<div className="space-y-1">
						<NavItem
							href="/admin/categories"
							label="Categories"
							active={pathname.startsWith("/admin/categories")}
						/>

						<NavItem
							href="/admin/subcategories"
							label="Subcategories"
							active={pathname.startsWith("/admin/subcategories")}
						/>

						<NavItem
							href="/admin/tags"
							label="Tags"
							active={pathname.startsWith("/admin/tags")}
						/>

						<NavItem
							href="/admin/posts"
							label="Posts"
							active={pathname.startsWith("/admin/posts")}
						/>
					</div>

					{/* <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
						Management
					</p> */}

					{/* <div className="space-y-1">
						<NavItem
							href="/admin/media"
							label="Media Library"
							active={pathname.startsWith("/admin/media")}
						/>

						<NavItem
							href="/admin/settings"
							label="Settings"
							active={pathname.startsWith("/admin/settings")}
						/>
					</div> */}
				</nav>

				{/* Footer */}
				<div className="border-t border-slate-200 p-4">
					<Link
						href="/"
						className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
					>
						← View Website
					</Link>
				</div>
			</div>
		</aside>
	);
}

function NavItem({
	href,
	label,
	active,
}: {
	href: string;
	label: string;
	active: boolean;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
				active
					? "bg-blue-50 text-blue-700"
					: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
			}`}
		>
			{label}
		</Link>
	);
}
