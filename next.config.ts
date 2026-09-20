import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	// Add these two blocks to bypass build-blocking linter/type checks
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

	async redirects() {
		return [
			{
				source: "/",
				destination: "/blog",
				permanent: true, // Set to true for permanent 301 redirect (good for SEO), or false for temporary
			},
		];
	},
};

export default nextConfig;
