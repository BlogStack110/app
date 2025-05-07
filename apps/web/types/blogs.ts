export interface BlogData {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorImgUrl: string;
  publishDate: string;
  tags: string[];
  imgUrl: string;
  author: {
    name: string;
  };
  comments: {
    id: string;
    user: {
      id: string;
      name: string;
      pfpUrl: string | null;
    };
    comment: string;
    commentedAt: Date;
  }[];
  likes: {
  }[];
}
