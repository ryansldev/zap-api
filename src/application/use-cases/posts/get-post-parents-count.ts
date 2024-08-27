import { PostsRepository } from "@repositories/posts-repository";

interface GetPostParentsCountProps {
  id: string;
}

export class GetPostParentsCount {
  constructor(
    private postsRepository: PostsRepository,
  ) {}

  async execute({ id }: GetPostParentsCountProps) {
    return await this.postsRepository.countParents(id)
  }
}