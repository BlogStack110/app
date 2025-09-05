import { prisma } from "@/lib/db";
import { Profile, Stats } from "@/types/profile";

export const getProfileDetails = async (id: string): Promise<Profile> => {
  const profile = await prisma.user.findUnique({
    where: {
      id,
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
        },
      },
    },
  });
  const userProfile: Profile = {
    userId: profile?.id ?? "",
    imgUrl: profile?.image ?? "",
    fullName: profile?.name ?? "",
    about: `
Passionate technologist with extensive experience architecting and delivering scalable web applications using modern JavaScript frameworks, cloud infrastructure, and microservices. Led cross-functional teams of 5-12 developers while maintaining hands-on involvement in system design and code reviews.
Expertise spans React/Node.js ecosystems, AWS/Azure cloud platforms, and DevOps practices including CI/CD pipelines and containerization. Successfully migrated legacy monoliths to microservices architecture, reducing deployment time by 75% and improving system reliability.
`,
    joinedDate: profile?.joinedOn ?? new Date(),
    emailVerified: profile?.emailVerified ?? false,
    followers: 69000,
    socialLinks: ["https://github.com/shivaraj110", "twitter", "twitch"],
  };
  return userProfile;
};

export const getStats = async (id: string): Promise<Stats> => {
  const stats = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      joinedOn: true,
      emailVerified: true,
      posts: {
        take: 3,
        select: {
          id: true,
          title: true,
          tags: true,
          _count: {
            select: {
              likes: true,
              views: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          views: true,
        },
      },
    },
  });

  let favTopics: string[] = [];

  stats?.posts.forEach((p) => {
    p.tags.forEach((t) => {
      favTopics.push(t);
    });
  });

  favTopics = [...new Set(favTopics)];

  const userStats: Stats = {
    badges: ["Grammer Gaurdian", "Beta Tester", "Developer"],
    RecentPosts: stats?.posts ?? null,
    following: [
      { userId: "1", email: "shivaraj@gmail.com" },
      { userId: "2", email: "lmao@gmail.com" },
    ],
    followers: [
      {
        userId: "1",
        email: "shivaraj@gmail.com",
      },
      {
        userId: "2",
        email: "lmao@gmail.com",
      },
    ],
    favTopics,
  };
  return userStats;
};
