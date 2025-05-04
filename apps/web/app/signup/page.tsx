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




  return (
    <div className="flex h-screen justify-center items-center">
    </div>
  );
};

export default Page;
