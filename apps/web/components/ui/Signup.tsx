"use client"

import { Icons } from "./icons"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Input } from "./input"
import { Label } from "./label"
import { useCallback, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export function CardsCreateAccount(mode: { mode: 'signin' | 'signup' }) {
  const [Mode, setMode] = useState<'signin' | 'signup'>(mode.mode)
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)



  const onSignInEmail = useCallback(async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          redirect("/");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );

  }, [])

  const onSigninGithub = useCallback(async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
    });
  }, [])

  const onSigninGoogle = useCallback(async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });
  }, [])

  const onSignupEmail = useCallback(async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          redirect("/");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );

  }, [])

  const onSignupGithub = useCallback(async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
    });
  }, [])

  const onSignupGoogle = useCallback(async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });
  }, [])

  if (Mode === 'signup') {
    return (

      <Card className="">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            You need an account to interact with the articles and share your own!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" className="cursor-pointer"
              onClick={onSignupGithub}
            >
              <Icons.gitHub />
              GitHub
            </Button>
            <Button variant="outline" className="cursor-pointer"
              onClick={onSignupGoogle}
            >
              <Icons.google />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input id="email" type="text" placeholder="Roronoa Zoro" onChange={(e) => {
              setName(e.target.value)
            }} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="address@example.com" onChange={(e) => {
              setEmail(e.target.value)
            }} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2 pb-2">
          <Button className="w-full" onClick={onSignupEmail}>Create account</Button>
          <p>already have an account? <strong className="underline cursor-pointer" onClick={() => {
            setMode('signin')
          }}>signin</strong></p>
        </CardFooter>
      </Card>
    )
  }
  else {
    return (
      <Card className="">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            aplicable only for registered users.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" className="cursor-pointer"
              onClick={onSigninGithub}
            >
              <Icons.gitHub />
              GitHub
            </Button>
            <Button variant="outline" className="cursor-pointer"
              onClick={onSigninGoogle}
            >
              <Icons.google />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="address@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2 pb-2">
          <Button className="w-full" onClick={onSignInEmail}>Sign in</Button>
          <p>don't have an account? <strong className="underline cursor-pointer" onClick={() => {
            setMode('signup')
          }}>signup</strong></p>
        </CardFooter>
      </Card>
    )
  }
}
