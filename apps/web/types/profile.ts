import { BlogData } from "./blogs";

export interface Profile {
  userId: string;
  imgUrl: string;
  fullName: string;
  about: string;
  socialLinks: string[];
  followers: number;
  joinedDate: Date;
  emailVerified: boolean;
}

export interface Stats {
  favTopics: string[];
  badges: string[];
  RecentPosts:
    | {
        id: string;
        title: string;
        _count: {
          likes: number;
          views: number;
        };
      }[]
    | null;
  following: { userId: string; email: string }[] | null;
  followers: { userId: string; email: string }[] | null;
}
