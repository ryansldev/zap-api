import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { CreatePost } from "@use-cases/posts/create-post";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class PostsController {
  private createPost: CreatePost

  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {
    this.createPost = new CreatePost(this.usersRepository, this.postsRepository)
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
}