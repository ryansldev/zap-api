import { Post } from "@entities/post";
import { User } from "@entities/user";

export interface PostsRepository {
  create(post: Post): Promise<void>
  findById(id: string): Promise<Post | undefined>
  like(post: Post, user: User): Promise<void>
  save(post: Post): Promise<void>
}