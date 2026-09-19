"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PasswordInput from "./PasswordInput";

type FieldErrors = Record<string, string[]>;

export default function LoginForm() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");
		setFieldErrors({});

		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					setFieldErrors(data.errors);
				}

				throw new Error(data.message || "Unable to sign in.");
			}

			// router.push("/account");
			router.push("/blog");
			router.refresh();
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Something went wrong.",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{/* Email */}
			<div>
				<label
					htmlFor="email"
					className="mb-2 block text-sm font-medium text-slate-700"
				>
					Email address
				</label>

				<input
					id="email"
					name="email"
					type="email"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);

						setFieldErrors((errors) => ({
							...errors,
							email: [],
						}));
					}}
					placeholder="you@example.com"
					autoComplete="email"
					required
					className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				/>

				{fieldErrors.email?.length > 0 && (
					<p className="mt-2 text-sm text-red-600">
						{fieldErrors.email[0]}
					</p>
				)}
			</div>

			{/* Password */}
			<PasswordInput
				id="password"
				name="password"
				label="Password"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);

					setFieldErrors((errors) => ({
						...errors,
						password: [],
					}));
				}}
				autoComplete="current-password"
			/>

			{fieldErrors.password?.length > 0 && (
				<p className="-mt-3 text-sm text-red-600">
					{fieldErrors.password[0]}
				</p>
			)}

			{/* General error */}
			{error && (
				<div
					role="alert"
					className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
				>
					{error}
				</div>
			)}

			{/* Submit */}
			<button
				type="submit"
				disabled={loading}
				className="h-12 w-full rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{loading ? "Signing in..." : "Sign in"}
			</button>

			<p className="text-center text-sm text-slate-500">
				Don't have an account?{" "}
				<Link
					href="/register"
					className="font-semibold text-blue-600 hover:text-blue-700"
				>
					Create one
				</Link>
			</p>
		</form>
	);
}
