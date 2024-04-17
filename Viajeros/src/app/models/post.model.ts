export interface Post {
  id: number;
  title: string;
  description: string;
  created: Date;
  images: PostImage[];
}
export interface PostImage {
  id: number;
  postId: number;
  imageUrl: string;
}
