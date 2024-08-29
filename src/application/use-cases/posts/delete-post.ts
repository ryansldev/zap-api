import { PostsRepository } from "@repositories/posts-repository";
import { PostNotFound } from "./errors/PostNotFound";
import { UserNotAuthorized } from "./errors/UserNotAuthorized";

interface DeletePostRequest {
  id: string
  authorId: string
}

export class DeletePost {
  constructor (
    private postsRepository: PostsRepository
  ) {}

  async execute({ id, authorId }: DeletePostRequest) {
    const post = await this.postsRepository.findById(id)
    if(!post) throw new PostNotFound();

    if(post.authorId !== authorId) throw new UserNotAuthorized();

    await this.postsRepository.delete(id)

    return post
  }
}