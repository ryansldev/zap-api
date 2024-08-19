import { PostsRepository } from "@repositories/posts-repository";

interface FindPostByIdRequest {
  id: string
}

export class FindPostById {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id }: FindPostByIdRequest) {
    return await this.postsRepository.findById(id)
  }
}