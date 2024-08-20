import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { CreatePost } from "@use-cases/posts/create-post";
import { LikePost } from "@use-cases/posts/like-post";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class PostsController {
  private createPost: CreatePost
  private likePost: LikePost

  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {
    this.createPost = new CreatePost(this.usersRepository, this.postsRepository)
    this.likePost = new LikePost(this.usersRepository, this.postsRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user

    const createPostBodySchema = z.object({
      text: z.string(),
      parentId: z.string().uuid().optional(),
    })

    const { text, parentId } = createPostBodySchema.parse(request.body)

    await this.createPost.execute({
      text,
      authorId,
      parentId,
    })
  }

  async like(request: FastifyRequest, _reply: FastifyReply) {
    const { id: userId } = request.user

    const likePostParamsSchema = z.object({
      id: z.string(),
    })

    const { id: postId } = likePostParamsSchema.parse(request.params)

    await this.likePost.execute({ userId, postId })
  }
}