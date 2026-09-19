import PostForm from "@/components/admin/posts/PostForm";
import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Post
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create an article, video or image post.
            </p>
          </div>

          <Link
            href="/admin/posts"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </Link>
        </div>

        {/* Form */}
        <PostForm />
      </div>
    </div>
  );
}