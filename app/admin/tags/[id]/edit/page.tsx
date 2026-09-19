import { notFound } from "next/navigation";

import TagForm from "@/components/admin/tags/TagForm";
import { getTag } from "@/lib/api/tags";

export default async function EditTagPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const tagId = Number(id);

	if (Number.isNaN(tagId)) {
		notFound();
	}

	try {
		const tag = await getTag(tagId);

		return (
			<div className="p-6">
				<div className="mb-6">
					<p className="text-sm text-slate-500">
						Admin / Tags / Edit
					</p>
				</div>

				<TagForm tag={tag} />
			</div>
		);
	} catch {
		notFound();
	}
}
