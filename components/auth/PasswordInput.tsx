"use client";

import { useState } from "react";

interface PasswordInputProps {
	id: string;
	name: string;
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	autoComplete?: string;
	required?: boolean;
	error?: string;
}

export default function PasswordInput({
	id,
	name,
	label,
	value,
	onChange,
	placeholder = "Enter your password",
	autoComplete,
	required = true,
	error,
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div>
			<label
				htmlFor={id}
				className="mb-2 block text-sm font-medium text-slate-700"
			>
				{label}
			</label>

			<div className="relative">
				<input
					id={id}
					name={name}
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete={autoComplete}
					required={required}
					className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
				/>

				<button
					type="button"
					onClick={() => setShowPassword((value) => !value)}
					className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
					aria-label={
						showPassword ? "Hide password" : "Show password"
					}
				>
					{showPassword ? "Hide" : "Show"}
				</button>
			</div>

			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
}
