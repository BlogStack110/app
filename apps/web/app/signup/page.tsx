"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const Page = () => {
  const name: string = "shivaraj1110";
  const email: string = "shivarajchandaragi9@gmail.com";
  const password: string = "asdasdasssd";
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex h-screen justify-center items-center">
      <button
        onClick={async () => {
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
        }}
        className=" p-1 px-5 border size-fit border-gray-100 cursor-pointer shadow-lg"
      >
        Signup
      </button>
      <button
        className="flex justify-center"
        onClick={async () => {
          const { data, error } = await authClient.signIn.social({
            provider: "github",
          });
        }}
      >
        GitHub
      </button>
    </div>
  );
};

export default Page;
