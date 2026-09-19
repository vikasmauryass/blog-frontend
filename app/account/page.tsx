import LogoutButton from "@/components/auth/LogoutButton";
import { requireAuth } from "@/lib/server/guards";

export default async function AccountPage() {
	const { user } = await requireAuth();

	return (
		<main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<p className="text-sm font-semibold text-blue-600">
						My Account
					</p>

					<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
						Welcome, {user.name} 👋
					</h1>

					<p className="mt-2 text-slate-500">
						Manage your account information.
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<div className="grid gap-6 sm:grid-cols-2">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
								Name
							</p>

							<p className="mt-2 text-sm font-medium text-slate-900">
								{user.name}
							</p>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
								Email
							</p>

							<p className="mt-2 text-sm font-medium text-slate-900">
								{user.email}
							</p>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
								User ID
							</p>

							<p className="mt-2 text-sm font-medium text-slate-900">
								#{user.id}
							</p>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
								Role
							</p>

							<p className="mt-2 text-sm font-medium capitalize text-slate-900">
								{user.role?.name ?? "User"}
							</p>
						</div>
					</div>

					<div className="mt-8 border-t border-slate-100 pt-6">
						<LogoutButton />
					</div>
				</div>
			</div>
		</main>
	);
}
