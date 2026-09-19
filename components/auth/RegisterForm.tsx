"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
	const router = useRouter();

	const [name, setName] = useState("");

	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError("");

		if (!name || !email || !password || !passwordConfirmation) {
			setError("Please fill in all fields.");
			return;
		}

		if (password !== passwordConfirmation) {
			setError("Password and confirm password do not match.");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
					password_confirmation: passwordConfirmation,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Registration failed.");
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
			<div>
				<label
					htmlFor="name"
					className="mb-2 block text-sm font-medium text-slate-700"
				>
					Full name
				</label>

				<input
					id="name"
					name="name"
					type="text"
					value={name}
					onChange={(event) => setName(event.target.value)}
					placeholder="Your name"
					autoComplete="name"
					required
					className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				/>
			</div>

			<div>
				<label
					htmlFor="register-email"
					className="mb-2 block text-sm font-medium text-slate-700"
				>
					Email address
				</label>

				<input
					id="register-email"
					name="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="you@example.com"
					autoComplete="email"
					required
					className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				/>
			</div>

			<PasswordInput
				id="register-password"
				name="password"
				label="Password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				autoComplete="new-password"
			/>

			<PasswordInput
				id="password-confirmation"
				name="password_confirmation"
				label="Confirm password"
				value={passwordConfirmation}
				onChange={(event) =>
					setPasswordConfirmation(event.target.value)
				}
				placeholder="Re-enter your password"
				autoComplete="new-password"
			/>

			{error && (
				<div
					role="alert"
					className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
				>
					{error}
				</div>
			)}

			<button
				type="submit"
				disabled={loading}
				className="h-12 w-full rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{loading ? "Creating account..." : "Create account"}
			</button>

			<p className="text-center text-sm text-slate-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold text-blue-600 hover:text-blue-700"
				>
					Sign in
				</Link>
			</p>
		</form>
	);
}
