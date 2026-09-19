import Navbar from "@/components/common/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "BlogSpace",
	description: "Knowledge, ideas and stories.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />

				{children}
			</body>
		</html>
	);
}
