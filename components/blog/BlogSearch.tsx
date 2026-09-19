"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function BlogSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialSearch = searchParams.get("search") || "";

	const [search, setSearch] = useState(initialSearch);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const params = new URLSearchParams();

		const value = search.trim();

		if (value) {
			params.set("search", value);
		}

		params.set("page", "1");

		router.push(`/blog?${params.toString()}`);
	};

	const handleClear = () => {
		setSearch("");
		router.push("/blog");
	};

	return (
		<div className="mb-6">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 sm:flex-row"
			>
				<div className="relative flex-1">
					<input
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search articles..."
						className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/>
				</div>

				<div className="flex gap-2">
					<button
						type="submit"
						className="min-h-11 flex-1 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 sm:flex-none"
					>
						Search
					</button>

					{searchParams.get("search") && (
						<button
							type="button"
							onClick={handleClear}
							className="min-h-11 rounded-lg border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Clear
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
