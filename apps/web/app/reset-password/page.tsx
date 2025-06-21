"use client"
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const [newPassword, setNewPassword] = useState<string>("")
	const searchParams = useSearchParams()

	const token = searchParams.get('token');
	const resetPassword = async () => {
		const ctx = await auth.$context;
		const hash = await ctx.password.hash(newPassword);
		if (!token) {
			// Handle the error
			console.error("invalid token")
		}
		else {
			const { data, error } = await authClient.resetPassword({
				newPassword: hash,
				token,
			});

		}
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-white">
				<input type="text" name="newPassword" onChange={(e) => {
					setNewPassword(e.target.value)
				}} />
				<p className="text-red-500">hellooo</p>
				<button onClick={resetPassword}>save</button>
			</div>
		)
	}
}
