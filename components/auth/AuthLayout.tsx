interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
}

export default function AuthLayout({
	children,
	title,
	subtitle,
}: AuthLayoutProps) {
	return (
		<main className="min-h-screen bg-slate-50">
			<div className="grid min-h-screen lg:grid-cols-2">
				{/* Left Branding Section */}
				<section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_40%)]" />

					<div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
						{/* Logo */}
						<div>
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950">
									B
								</div>

								<span className="text-xl font-bold text-white">
									BlogSpace
								</span>
							</div>
						</div>

						{/* Main Content */}
						<div className="max-w-lg">
							<p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
								Knowledge. Ideas. Stories.
							</p>

							<h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
								Read something
								<br />
								worth remembering.
							</h1>

							<p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
								Explore useful articles, discover new ideas, and
								share your thoughts with the community.
							</p>
						</div>

						{/* Footer */}
						<p className="text-sm text-slate-500">
							© {new Date().getFullYear()} BlogSpace
						</p>
					</div>
				</section>

				{/* Right Form Section */}
				<section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
					<div className="w-full max-w-md">
						{/* Mobile Logo */}
						<div className="mb-10 flex items-center gap-3 lg:hidden">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
								B
							</div>

							<span className="text-lg font-bold text-slate-950">
								BlogSpace
							</span>
						</div>

						{/* Heading */}
						<div className="mb-8">
							<h2 className="text-3xl font-bold tracking-tight text-slate-950">
								{title}
							</h2>

							<p className="mt-2 text-sm leading-6 text-slate-500">
								{subtitle}
							</p>
						</div>

						{children}
					</div>
				</section>
			</div>
		</main>
	);
}
