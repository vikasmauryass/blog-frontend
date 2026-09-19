import LogoutButton from "@/components/auth/LogoutButton";
import { getAuthenticatedUser } from "@/lib/server/auth";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
	const auth = await getAuthenticatedUser();

	const user = auth?.user;

	const isAdmin = user?.role?.name === "admin";

	return (
		<header className="border-b border-slate-200 bg-white">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
						B
					</div>

					<span className="text-lg font-bold text-slate-950">
						BlogSpace
					</span>
				</Link>

				{/* Navigation */}
				<nav className="hidden items-center gap-6 md:flex">
					{/* <Link
						href="/blog"
						className="text-sm font-medium text-slate-600 hover:text-slate-950"
					>
						Home
					</Link> */}

					<Link
						href="/blog"
						className="text-lg font-medium text-slate-600 hover:text-slate-950"
					>
						Blog
					</Link>

					{/* <Link
						href="/category"
						className="text-sm font-medium text-slate-600 hover:text-slate-950"
					>
						Categories
					</Link>

					<Link
						href="/search"
						className="text-sm font-medium text-slate-600 hover:text-slate-950"
					>
						Search
					</Link> */}
				</nav>

				{/* Authentication */}
				<div className="flex items-center gap-3">
					{!user ? (
						<>
							<Link
								href="/login"
								className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block"
							>
								Sign in
							</Link>

							<Link
								href="/register"
								className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
							>
								Get started
							</Link>
						</>
					) : (
						<>
							{isAdmin && (
								<Link
									href="/admin"
									className="hidden rounded-xl px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 sm:block"
								>
									Dashboard
								</Link>
							)}

							<Link
								href="/account"
								className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
							>
								My Account
							</Link>

							<LogoutButton />
						</>
					)}
				</div>

				<MobileMenu isAuthenticated={Boolean(user)} isAdmin={isAdmin} />
			</div>
		</header>
	);
}
