"use client";

import { useCallback, useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { CardsCreateAccount } from "@/components/ui/Signup";

const Page = () => {
  const name: string = "shivaraj1110";
  const email: string = "shivarajchandaragi9@gmail.com";
  const password: string = "asdasdasssd";
  const [loading, setLoading] = useState<boolean>(false);
  const onSigupEmail = useCallback(async () => {
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

  const onSigupGithub = useCallback(async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
    });

  }, [])
  return (
    <div className="flex h-screen justify-center items-center">
      <CardsCreateAccount />
    </div>
  );
};

export default Page;
