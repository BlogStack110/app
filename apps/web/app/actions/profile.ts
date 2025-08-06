import { prisma } from "@/lib/db";
import { Profile } from "@/types/profile";

export const getProfileDetails = async (id: string): Promise<Profile> => {
	const profile = await prisma.user.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			image: true,
			joinedOn: true,
			emailVerified: true,
			_count: {
				select: {
					likes: true,
					posts: true,
					views: true,
				}
			}
		}
	})
	const userProfile: Profile = {
		userId: profile?.id ?? "",
		imgUrl: profile?.image ?? "",
		fullName: profile?.name ?? "",
		about: `
Passionate technologist with extensive experience architecting and delivering scalable web applications using modern JavaScript frameworks, cloud infrastructure, and microservices. Led cross-functional teams of 5-12 developers while maintaining hands-on involvement in system design and code reviews.
Expertise spans React/Node.js ecosystems, AWS/Azure cloud platforms, and DevOps practices including CI/CD pipelines and containerization. Successfully migrated legacy monoliths to microservices architecture, reducing deployment time by 75% and improving system reliability.
`,
		totalPosts: profile?._count.posts ?? 0,
		totalLikes: profile?._count.likes ?? 0,
		totalVeiws: profile?._count.views ?? 0,
		joinedDate: profile?.joinedOn ?? new Date(),
		emailVerified: profile?.emailVerified ?? false,
		followers: 69000,
		socialLinks: ["https://github.com/shivaraj110", "twitter", "twitch",],
		badges: ["Grammer Gaurdian", "Beta Tester"]
	}
	return userProfile
}
