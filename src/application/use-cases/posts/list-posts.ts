import { PostsRepository } from "@repositories/posts-repository";

interface ListPostsProps {
  page?: number;
  limit?: number;
  authorId?: string;
}

export class ListPosts {
  constructor(
    private postsRepository: PostsRepository,
  ) {}

  async execute({ page = 1, limit = 25, authorId }: ListPostsProps) {
    return await this.postsRepository.list(page, limit, authorId)
  }
}