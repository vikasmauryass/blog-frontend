import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/server/guards";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireAdmin();

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="flex min-h-screen">
				{/* Sidebar */}
				<Sidebar />

				{/* Main content */}
				<div className="flex min-w-0 flex-1 flex-col">
					<Navbar />

					<main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
				</div>
			</div>
		</div>
	);
}
