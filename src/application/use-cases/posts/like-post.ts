import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { PostNotFound } from "./errors/PostNotFound";
import { UserNotFound } from "@use-cases/users/errors/UserNotFound";

interface LikePostRequest {
  postId: string;
  userId: string;
}

export class LikePost {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: LikePostRequest) {
    const user = await this.usersRepository.findById(userId)
    if(!user) throw new UserNotFound();

    const post = await this.postsRepository.findById(postId)
    if(!post) throw new PostNotFound();

    await this.postsRepository.like(post, user)

    return post
  }
}