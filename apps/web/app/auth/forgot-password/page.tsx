"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
export default function Page() {
  const [email, setEmail] = useState<string>("")
  const handleSubmit = async () => {
    await authClient.forgetPassword({
      email, // Email to which the reset password link should be sent.
      redirectTo: "/reset-password" // URL to redirect the user after resetting the password.
    }
    )
  }
  return (
    <div className="flex justify-center my-auto">
      <Card className="transform-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            enter your email to receive a reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              id="email"
              type="email"
              placeholder="" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" onClick={handleSubmit}>
            confirm
          </Button>
        </CardFooter>
      </Card >
    </div>
  )
}
