import { Post } from "@entities/post";
import { UserHTTP, UserViewModel } from "./user-view-model";

interface PostHTTP {
  id: string;
  text: string;
  parentId?: string;
  authorId: string;
  author: UserHTTP;
  createdAt: Date;
  updatedAt: Date;
}

interface FullPostHTTP {
  id: string;
  text: string;
  parentId?: string;
  authorId: string;
  author: UserHTTP;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PostViewModel {
  static toHTTP(post: Post): PostHTTP {
    return {
      id: post.id,
      text: post.text,
      parentId: post.parentId,
      authorId: post.authorId,
      author: UserViewModel.toHTTP(post.author),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }

  static toFullHTTP(post: Post): FullPostHTTP {
    return {
      id: post.id,
      text: post.text,
      parentId: post.parentId,
      authorId: post.authorId,
      author: UserViewModel.toHTTP(post.author),
      likes: post.likedBy.length,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}