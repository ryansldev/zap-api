import { PostsRepository } from "@repositories/posts-repository";

interface ListPostParentsRequest {
  id: string
  limit?: number
  page?: number
}

export class ListPostParents {
  constructor (
    private postsRepository: PostsRepository
  ) {}

  async execute({ id, page, limit }: ListPostParentsRequest) {
    return await this.postsRepository.listParents(id, page, limit)
  }
}