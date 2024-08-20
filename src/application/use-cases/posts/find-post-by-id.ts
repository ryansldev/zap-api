import { PostsRepository } from "@repositories/posts-repository";
import { PostNotFound } from "./errors/PostNotFound";

interface FindPostByIdRequest {
  id: string
}

export class FindPostById {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id }: FindPostByIdRequest) {
    const post = await this.postsRepository.findById(id)
    if(!post) throw new PostNotFound();

    return post
  }
}