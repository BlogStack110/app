"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
	X,
	BookMarked,
	NotebookPen,
	MessageSquareText,
	Settings,
	Home,
	LogOut,
	BarChart2,
	Users,
	Compass,
	User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client"; // better-auth client hook
import { authClient } from "@/lib/auth-client"; // better-auth client
import ToastContainer from "@/components/ToastContainer";
import PublicNavbar from "@/components/PublicNavbar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { data: session, isPending } = useSession();
	const router = useRouter();
	const pathname = usePathname(); // Redirect to login if not authenticated
	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
		}
	}, [session, isPending, router]);

	// Close sidebar when route changes on mobile
	useEffect(() => {
		if (sidebarOpen) {
			setSidebarOpen(false);
		}
	}, []);

	// Close sidebar when clicking outside on mobile
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const sidebar = document.getElementById("sidebar");
			const hamburger = document.getElementById("hamburger-button");

			if (
				sidebarOpen &&
				sidebar &&
				hamburger &&
				!sidebar.contains(event.target as Node) &&
				!hamburger.contains(event.target as Node)
			) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sidebarOpen]);

	// Check if current route matches link
	const isActive = (path: string) => {
		return (
			pathname === path || (path !== "/dashboard" && pathname.startsWith(path))
		);
	};

	// Handle sign out
	const handleSignOut = async () => {
		try {
			await authClient.signOut();
			router.push("/login");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	// Navigation items with their respective icons and paths
	const navItems = [
		{
			section: "Main",
			items: [
				{
					name: "Home",
					icon: <Home className="h-5 w-5" />,
					path: "/dashboard",
				},
				{
					name: "Explore",
					icon: <Compass className="h-5 w-5" />,
					path: "/dashboard/blogs",
				},
				{
					name: "My Blogs",
					icon: <BarChart2 className="h-5 w-5" />,
					path: "/dashboard/myblogs",
				},
				{
					name: "Bookmarks",
					icon: <BookMarked className="h-5 w-5" />,
					path: "/dashboard/bookmarks",
				},
			],
		},
		{
			section: "Create",
			items: [
				{
					name: "Write Blog",
					icon: <NotebookPen className="h-5 w-5" />,
					path: "/dashboard/write",
				},
			],
		},
		{
			section: "Social",
			items: [
				{
					name: "Messages",
					icon: <MessageSquareText className="h-5 w-5" />,
					path: "/dashboard/messages",
				},
				{
					name: "Friends",
					icon: <Users className="h-5 w-5" />,
					path: "/dashboard/friends",
				},
			],
		},
	];

	// User Button Component
	const UserButton = () => {
		const user = session?.user;

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={user?.image?.toString() || ""}
								alt={user?.name || ""}
							/>
							<AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
								{user?.name ? (
									user.name.charAt(0).toUpperCase()
								) : (
									<User className="h-4 w-4" />
								)}
							</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-56 bg-[#111111] border-white/10"
				>
					<div className="px-2 py-1.5 text-sm">
						<p className="font-medium text-white">{user?.name}</p>
						<p className="text-xs text-white/60">{user?.email}</p>
					</div>
					<DropdownMenuSeparator className="bg-white/10" />
					<DropdownMenuItem asChild>
						<Link
							href="/dashboard/profile"
							className="text-white hover:bg-white/10"
						>
							<User className="mr-2 h-4 w-4" />
							Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/dashboard/settings"
							className="text-white hover:bg-white/10"
						>
							<Settings className="mr-2 h-4 w-4" />
							Settings
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator className="bg-white/10" />
					<DropdownMenuItem
						onClick={handleSignOut}
						className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
					>
						<LogOut className="mr-2 h-4 w-4" />
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	};

	// Show loading state while checking authentication
	if (isPending) {
		return (
			<div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0a0a0a] to-[#111827]">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	// Don't render if not authenticated (will redirect)
	if (!session) {
		return null;
	}

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-[#0a0a0a] to-[#111827] text-white overflow-hidden">
			<PublicNavbar />
			<div className="flex flex-1 overflow-hidden">
				{/* Socket initializer */}
				{/* <SocketInitializer /> */}

				{/* Toast notifications container */}
				<ToastContainer />

				{/* Overlay for mobile */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Sidebar */}
				<aside
					id="sidebar"
					onMouseEnter={() => setIsCollapsed(false)}
					onMouseLeave={() => setIsCollapsed(true)}
					className={`fixed top-0 left-0 z-30 h-full bg-gradient-to-b from-[#111111] to-[#0d0d0d] border-r border-white/10 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl ${isCollapsed ? "w-20" : "w-72"
						} ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
				>
					{" "}
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-end px-6 py-6">
							<button
								onClick={() => setSidebarOpen(false)}
								className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
							>
								<X className="h-6 w-6" />
							</button>
						</div>{" "}
						<div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
							{/* User Info */}
							<div className={` ${!isCollapsed && "relative flex items-center space-x-4 mb-8 px-2 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-300 group overflow-hidden cursor-pointer"}`}>
								<UserButton />
								{!isCollapsed && (
									<div className="relative z-10">
										<p className="text-sm font-semibold">
											{session.user?.name}
										</p>
										<p className="text-xs text-white/60">
											{session.user?.email}
										</p>
									</div>
								)}

								{/* Main shimmer effect */}
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

								{/* Subtle secondary shimmer */}
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-400/5 to-transparent transition-transform duration-1200 delay-100 group-hover:translate-x-full" />
							</div>
							{/* Navigation */}
							<nav className="space-y-6 mt-16">
								{navItems.map((section) => (
									<div className="mt-5" key={section.section}>
										<p
											className={`px-2 text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 ${isCollapsed ? "text-center" : ""
												}`}
										>
											{isCollapsed
												? " "
												: section.section}
										</p>
										<div className="space-y-3">
											{section.items.map((item) => {
												const active = isActive(item.path);
												return (
													<Link
														key={item.path}
														href={item.path}
														className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group ${active
															? "bg-gradient-to-r from-blue-500/20 to-indigo-500/10 text-blue-400 font-medium"
															: "text-white/70 hover:text-white hover:bg-white/10"
															} ${isCollapsed ? "justify-center" : ""}`}
													>
														{active && (
															<span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full" />
														)}
														<span
															className={`${active
																? "text-blue-400"
																: "text-white/60 group-hover:text-white group-hover:scale-110"
																} transition-all duration-200`}
														>
															{item.icon}
														</span>
														{!isCollapsed && <span>{item.name}</span>}
														{active && !isCollapsed && (
															<span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-blue-500" />
														)}
													</Link>
												);
											})}
										</div>{" "}
									</div>
								))}
							</nav>
						</div>
						{/* Sidebar Footer */}
						<div className="p-4 border-t border-white/10">
							<button
								onClick={handleSignOut}
								className="flex items-center justify-center w-full space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 text-white/80 hover:text-white transition-all duration-200 group"
							>
								<LogOut className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
								{!isCollapsed && <span>Sign Out</span>}
							</button>
						</div>{" "}
					</div>
				</aside>

				{/* Main Content */}
				<div className="flex-1 flex flex-col overflow-hidden">
					{/* Page Content */}
					<main
						className={`flex-1 overflow-y-auto bg-[#0a0a0a] ${!pathname.startsWith("/dashboard/messages") ? "p-6" : ""
							}`}
					>
						<div className="w-4/5 mx-auto">{children}</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
