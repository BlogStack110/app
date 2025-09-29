"use client";
import Link from "next/link";
import { Menu, X, User, LogOut, PlusIcon, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient, useSession } from "../lib/auth-client";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CardsCreateAccount } from "./ui/Signup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "./ui/input";
export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const session = useSession();
  const [user, setUser] = useState(session.data?.user);
  const router = useRouter();
  const isLoaded = session.data;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    router.refresh();
    setUser(session.data?.user);
  }, [session]);

  return (
    <nav className="bg-neutral-900 z-30 border-b py-0 border-white/10 sticky top-0 w-full">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-10">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 text-white group"
            >
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                BlogStack
              </span>
            </Link>
          </div>
          <div className="relative hidden md:flex flex-1 justify-center top-3 items-center max-w-sm mt-2">
            <Search className="size-4 text-gray-400 dark:text-white/40 translate-x-6 cursor-pointer" />
            <Input
              type="text"
              name="search"
              placeholder="Search blogs..."
              defaultValue={""}
              className="w-full   pl-8 rounded-xl border-none  inset-shadow-neutral-950 inset-shadow-sm  bg-neutral-900
							text-white placeholder-white/40 outline-none focus:border-neutral-950 transition-all"
            />
          </div>{" "}
          <div className="hidden md:ml-6 md:flex md:items-center">
            {isLoaded && user ? (
              <div className="relative flex items-center space-x-4">
                <div className="shadow-neutral-600 shadow-sm flex p-1 justify-center items-center rounded-md bg-neutral-900 transition-colors cursor-pointer">
                  <Bell className=" size-5 fill-neutral-500 text-neutral-500" />
                </div>

                <div className="shadow-neutral-600 shadow-sm flex p-1 justify-center items-center rounded-md bg-neutral-900 transition-colors cursor-pointer">
                  <PlusIcon className=" size-5 text-neutral-500" />
                </div>

                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-3 text-white focus:outline-none"
                >
                  <div className="flex items-center space-x-3 border  border-neutral-500 rounded-md">
                    {user.image ? (
                      <Image
                        height={1000}
                        width={1000}
                        src={user.image.toString()}
                        alt={user.name || "User"}
                        className="size-7 rounded-md border cursor-pointer border-white/20"
                      />
                    ) : (
                      <div className="size-5 rounded-full bg-blue-600 flex items-center justify-center border border-white/20">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="text-white/80">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer underline bg-none font-semibold">
                        Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent  max-w-[400px] border-none outline-none">
                      <CardsCreateAccount mode="signin" />
                      <DialogTitle />
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer bg-blue-600 hover:bg-slate-300/30 font-semibold">
                        Get Started
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent  max-w-[400px] border-none  outline-none">
                      <CardsCreateAccount mode="signup" />
                      <DialogTitle />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-4 pb-3 border-t border-white/10">
          {isLoaded && user ? (
            <div className="space-y-2 px-4">
              <div className="flex items-center space-x-3 mb-3">
                {user.image ? (
                  <Image
                    height={1000}
                    width={1000}
                    src={user.image.toString()}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-white/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-white/60">{user.email}</div>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 w-full text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/myblogs"
                className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 w-full text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                My Blogs
              </Link>
              <Link
                href="/dashboard/bookmarks"
                className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 w-full text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookmarks
              </Link>
              <div
                className="px-3 py-2 rounded-lg text-red-400 hover:bg-white/10 w-full text-sm mt-2 border-t border-white/10 pt-2 flex items-center"
                onClick={async () => {
                  await authClient.signOut();
                  window.location.reload();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </div>
            </div>
          ) : (
            <div className="flex items-center px-4 space-x-3">
              <div className="text-white/80">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer underline font-semibold">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 bg-transparent border-none  outline-none max-w-[400px]">
                    <CardsCreateAccount mode="signin" />
                    <DialogTitle />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex-grow">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-blue-600 hover:bg-slate-300/30 font-semibold">
                      Get Started
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 bg-transparent  max-w-[400px]  outline-none border-none">
                    <CardsCreateAccount mode="signup" />
                    <DialogTitle />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
