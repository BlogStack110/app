"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const [newPassword, setNewPassword] = useState<string>("")
	const searchParams = useSearchParams()
	const router = useRouter()
	const token = searchParams.get('token');
	const resetPassword = async () => {
		if (!token) {
			// Handle the error
			console.error("invalid token")
		}
		else {
			await authClient.resetPassword({
				newPassword,
				token,
			}, {
				onSuccess: () => {
					alert("Password reset successfully, you can now login with your new password")
					router.replace('/');
				}
			});

		}
	}
	return (
		<div className="flex justify-center my-auto">
			<Card className="transform-card">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Reset your password</CardTitle>
					<CardDescription>
						enter your new password below to reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label>Enter new password</Label>
						<Input
							onChange={(e) => {
								setNewPassword(e.target.value)
							}}
							type="password"
							placeholder="" />
						<Label htmlFor="email">Confirm new password</Label>
						<Input
							onChange={(e) => {
								setNewPassword(e.target.value)
							}}
							type="password"
							placeholder="" />

					</div>
				</CardContent>
				<CardFooter className="flex-col space-y-2 pb-2">
					<Button className="w-full cursor-pointer" onClick={resetPassword}>
						Reset Password
					</Button>
				</CardFooter>
			</Card >
		</div>
	)

}
