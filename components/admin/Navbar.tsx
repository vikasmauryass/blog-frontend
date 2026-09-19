import LogoutButton from "@/components/auth/LogoutButton";
import { getAuthenticatedUser } from "@/lib/server/auth";
import Link from "next/link";

export default async function Navbar() {
	const auth = await getAuthenticatedUser();

	const user = auth?.user;

	return (
		<header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Left */}
				<div>
					<h1 className="text-lg font-semibold text-slate-900">
						Admin Panel
					</h1>

					<p className="hidden text-xs text-slate-500 sm:block">
						Manage your BlogSpace content
					</p>
				</div>

				{/* Right */}
				<div className="flex items-center gap-4">
					<Link
						href="/"
						className="hidden text-sm font-medium text-slate-600 transition hover:text-blue-600 sm:block"
					>
						View Website
					</Link>

					<div className="hidden h-6 w-px bg-slate-200 sm:block" />

					<div className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
							{user?.name?.charAt(0).toUpperCase() ?? "A"}
						</div>

						<div className="hidden text-right md:block">
							<p className="text-sm font-semibold text-slate-900">
								{user?.name ?? "Admin"}
							</p>

							<p className="text-xs text-slate-500">
								{user?.role?.name ?? "Admin"}
							</p>
						</div>

						<LogoutButton />
					</div>
				</div>
			</div>
		</header>
	);
}
