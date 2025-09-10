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
        orderBy: {
          tags: "desc",
        },
        take: 6,
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
  favTopics = favTopics.slice(0, 6);

  const userStats: Stats = {
    badges: [
      {
        name: "Detective",
        png: "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLPUPIkK36X3ZYOLg5R2Sjk4pAcNUD7QqTKiWJ",
        issued: "SEP 26 2024",
      },
      {
        name: "Developer",
        png: "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLcEPXse7UaE9SsuJmDGAWw46et5yqpjQXdK3M",
        issued: "DEC 03 2024",
      },
      {
        name: "Social",
        png: "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLUTiog7adKWxA692NzyOSQDoXIJbnFPlfitkm",
        issued: "FEB 18 2025",
      },
    ],
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
