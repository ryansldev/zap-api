import { Post } from "@entities/post";
import { User } from "@entities/user";

export interface PostsRepository {
  create(post: Post): Promise<void>
  findById(id: string): Promise<Post | undefined>
  list(page?: number, limit?: number, authorId?: string): Promise<Post[]>
  listParents(id: string, page?: number, limit?: number): Promise<Post[]>
  like(post: Post, user: User): Promise<void>
  countParents(id: string): Promise<number>
  dislike(post: Post, user: User): Promise<void>
  save(post: Post): Promise<void>
}