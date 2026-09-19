"use client";

import type { PostFormData } from "@/types/post";

interface PostSeoProps {
  form: PostFormData;
  onChange: (
    field: keyof PostFormData,
    value: string
  ) => void;
}

export default function PostSeo({
  form,
  onChange,
}: PostSeoProps) {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          SEO
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure search engine and social media metadata.
        </p>
      </div>

      <div className="space-y-5">
        {/* Meta Title */}
        <div>
          <label
            htmlFor="meta_title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Meta Title
          </label>

          <input
            id="meta_title"
            type="text"
            value={form.meta_title}
            onChange={(e) =>
              onChange("meta_title", e.target.value)
            }
            placeholder="Enter meta title"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label
            htmlFor="meta_description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Meta Description
          </label>

          <textarea
            id="meta_description"
            value={form.meta_description}
            onChange={(e) =>
              onChange("meta_description", e.target.value)
            }
            placeholder="Enter meta description"
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Meta Keywords */}
        <div>
          <label
            htmlFor="meta_keywords"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Meta Keywords
          </label>

          <input
            id="meta_keywords"
            type="text"
            value={form.meta_keywords}
            onChange={(e) =>
              onChange("meta_keywords", e.target.value)
            }
            placeholder="laravel, php, api, mysql"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Canonical URL */}
        <div>
          <label
            htmlFor="canonical_url"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Canonical URL
          </label>

          <input
            id="canonical_url"
            type="url"
            value={form.canonical_url}
            onChange={(e) =>
              onChange("canonical_url", e.target.value)
            }
            placeholder="https://example.com/blog/example-post"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* OG Title */}
        <div>
          <label
            htmlFor="og_title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            OG Title
          </label>

          <input
            id="og_title"
            type="text"
            value={form.og_title}
            onChange={(e) =>
              onChange("og_title", e.target.value)
            }
            placeholder="Title shown when shared on social media"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* OG Description */}
        <div>
          <label
            htmlFor="og_description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            OG Description
          </label>

          <textarea
            id="og_description"
            value={form.og_description}
            onChange={(e) =>
              onChange("og_description", e.target.value)
            }
            placeholder="Description shown when shared on social media"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* OG Image */}
        <div>
          <label
            htmlFor="og_image"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            OG Image URL
          </label>

          <input
            id="og_image"
            type="url"
            value={form.og_image}
            onChange={(e) =>
              onChange("og_image", e.target.value)
            }
            placeholder="https://example.com/images/blog-cover.jpg"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </section>
  );
}