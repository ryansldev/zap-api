import { PostsRepository } from "@repositories/posts-repository";

interface GetParentsCountProps {
  id: string;
}

export class GetParentsCount {
  constructor(
    private postsRepository: PostsRepository,
  ) {}

  async execute({ id }: GetParentsCountProps) {
    return await this.postsRepository.countParents(id)
  }
}