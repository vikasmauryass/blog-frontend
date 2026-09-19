import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	lastPage: number;
	basePath: string;
	queryParams?: Record<string, string | undefined>;
}

export default function Pagination({
	currentPage,
	lastPage,
	basePath,
	queryParams = {},
}: PaginationProps) {
	if (lastPage <= 1) {
		return null;
	}

	const createPageUrl = (page: number) => {
		const params = new URLSearchParams();

		Object.entries(queryParams).forEach(([key, value]) => {
			if (value !== undefined && value !== "") {
				params.set(key, value);
			}
		});

		params.set("page", String(page));

		return `${basePath}?${params.toString()}`;
	};

	const getPageNumbers = () => {
		const delta = 1;
		const range: (number | string)[] = [];
		const rangeWithDots: (number | string)[] = [];

		range.push(1);

		for (let i = currentPage - delta; i <= currentPage + delta; i++) {
			if (i < lastPage && i > 1) {
				range.push(i);
			}
		}

		if (lastPage > 1) {
			range.push(lastPage);
		}

		let l: number | undefined;

		for (const i of range) {
			if (typeof i === "number") {
				if (l !== undefined) {
					if (i - l === 2) {
						rangeWithDots.push(l + 1);
					} else if (i - l !== 1) {
						rangeWithDots.push("...");
					}
				}

				rangeWithDots.push(i);
				l = i;
			}
		}

		return rangeWithDots;
	};

	const pages = getPageNumbers();

	return (
		<nav
			aria-label="Pagination"
			className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
		>
			{currentPage > 1 ? (
				<Link
					href={createPageUrl(currentPage - 1)}
					className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50 sm:px-3 sm:py-2 sm:text-sm"
				>
					← Previous
				</Link>
			) : (
				<span className="cursor-not-allowed rounded-md border bg-gray-100 px-2.5 py-1.5 text-xs text-gray-400 sm:px-3 sm:py-2 sm:text-sm">
					← Previous
				</span>
			)}

			{pages.map((page, index) => {
				if (page === "...") {
					return (
						<span
							key={`dot-${index}`}
							className="px-2 py-1.5 text-xs text-gray-500 sm:text-sm"
						>
							...
						</span>
					);
				}

				const pageNum = page as number;
				const isCurrent = pageNum === currentPage;

				return (
					<Link
						key={pageNum}
						href={createPageUrl(pageNum)}
						className={`rounded-md border px-3 py-1.5 text-xs sm:px-3.5 sm:py-2 sm:text-sm transition-colors ${
							isCurrent
								? "border-blue-600 bg-blue-600 font-medium text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
					>
						{pageNum}
					</Link>
				);
			})}

			{currentPage < lastPage ? (
				<Link
					href={createPageUrl(currentPage + 1)}
					className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50 sm:px-3 sm:py-2 sm:text-sm"
				>
					Next →
				</Link>
			) : (
				<span className="cursor-not-allowed rounded-md border bg-gray-100 px-2.5 py-1.5 text-xs text-gray-400 sm:px-3 sm:py-2 sm:text-sm">
					Next →
				</span>
			)}
		</nav>
	);
}
