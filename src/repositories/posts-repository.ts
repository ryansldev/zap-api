import { Post } from "../entities/post";

export interface PostsRepository {
  create(post: Post): Promise<void>
  findById(id: string): Promise<Post | undefined>
  save(post: Post): Promise<void>
}