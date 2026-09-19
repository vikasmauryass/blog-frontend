import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { requireGuest } from "@/lib/server/guards";

export default async function RegisterPage() {
	await requireGuest();

	return (
		<AuthLayout
			title="Create your account"
			subtitle="Join the community and start exploring useful articles and ideas."
		>
			<RegisterForm />
		</AuthLayout>
	);
}
