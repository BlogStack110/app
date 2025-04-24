"use client";
import Link from "next/link";
import { authClient, useSession } from "../lib/auth-client";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col">
        {user ? <p>Home Page</p> : <Link href={"/signup"}>Sign up</Link>}
        {user ? <p>logged in as {user.name}</p> : null}
        <Link href={"/signin"}>Sign in</Link>
      </div>
      {user ? (
        <button
          className="cursor-pointer"
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          signout
        </button>
      ) : null}
    </div>
  );
}
