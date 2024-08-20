import { PostsRepository } from "@repositories/posts-repository";

export class ListPosts {
  constructor(
    private postsRepository: PostsRepository,
  ) {}

  async execute() {
    return await this.postsRepository.list()
  }
}