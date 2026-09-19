"use client";

import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
	isAuthenticated: boolean;
	isAdmin: boolean;
}

export default function MobileMenu({
	isAuthenticated,
	isAdmin,
}: MobileMenuProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
				aria-label="Toggle menu"
			>
				{open ? "Close" : "Menu"}
			</button>

			{open && (
				<div className="absolute left-0 right-0 top-[73px] z-50 border-b border-slate-200 bg-white p-5 shadow-lg">
					<nav className="flex flex-col gap-2">
						{/* <Link
							href="/"
							onClick={() => setOpen(false)}
							className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Home
						</Link> */}

						<Link
							href="/blog"
							onClick={() => setOpen(false)}
							className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Blog
						</Link>

						{/* <Link
							href="/category"
							onClick={() => setOpen(false)}
							className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Categories
						</Link>

						<Link
							href="/search"
							onClick={() => setOpen(false)}
							className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Search
						</Link> */}

						{isAuthenticated && (
							<Link
								href="/account"
								onClick={() => setOpen(false)}
								className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								My Account
							</Link>
						)}

						{isAdmin && (
							<Link
								href="/admin"
								onClick={() => setOpen(false)}
								className="rounded-xl px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
							>
								Dashboard
							</Link>
						)}
					</nav>
				</div>
			)}
		</div>
	);
}
