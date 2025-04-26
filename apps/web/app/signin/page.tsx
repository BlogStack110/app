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
        className="cursor-pointer"
        onClick={async () => {
          const { data, error } = await authClient.signIn.social({
            provider: "google",
          });
        }}
      >
        Google
      </button>
      <button
        onClick={async () => {
          const { data, error } = await authClient.signIn.email(
            {
              email, // user email address
              password, // user password -> min 8 characters by default
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
                // Handle the error
                if (ctx.error.status === 403) {
                  alert("Please verify your email address");
                }
                //you can also show the original error message
                alert(ctx.error.message);
              },
            },
          );
        }}
        className=" p-1 px-5 border size-fit border-gray-100 cursor-pointer shadow-lg"
      >
        SignIn
      </button>
    </div>
  );
};

export default Page;
