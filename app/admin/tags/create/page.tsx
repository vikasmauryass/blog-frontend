import TagForm from "@/components/admin/tags/TagForm";

export default function CreateTagPage() {
	return (
		<div className="p-6">
			<div className="mb-6">
				<p className="text-sm text-slate-500">Admin / Tags / Create</p>
			</div>

			<TagForm />
		</div>
	);
}
