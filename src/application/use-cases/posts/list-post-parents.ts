import { PostsRepository } from "@repositories/posts-repository";

interface ListPostParentsRequest {
  id: string
}

export class ListPostParents {
  constructor (
    private postsRepository: PostsRepository
  ) {}

  async execute({ id }: ListPostParentsRequest) {
    return await this.postsRepository.listParents(id)
  }
}