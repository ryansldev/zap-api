import { PostsRepository } from "@repositories/posts-repository";

interface ListPostsProps {
  page?: number;
  limit?: number;
}

export class ListPosts {
  constructor(
    private postsRepository: PostsRepository,
  ) {}

  async execute({ page = 1, limit = 25 }: ListPostsProps) {
    return await this.postsRepository.list(page, limit)
  }
}