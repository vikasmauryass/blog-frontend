import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { requireGuest } from "@/lib/server/guards";

export default async function LoginPage() {
	await requireGuest();

	return (
		<AuthLayout
			title="Welcome back"
			subtitle="Sign in to continue reading, commenting, and sharing your thoughts."
		>
			<LoginForm />
		</AuthLayout>
	);
}
