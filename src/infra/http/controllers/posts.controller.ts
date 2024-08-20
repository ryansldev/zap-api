import { z } from "zod";
import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { CreatePost } from "@use-cases/posts/create-post";
import { LikePost } from "@use-cases/posts/like-post";
import { ListPosts } from "@use-cases/posts/list-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { PostViewModel } from "@view-models/post-view-model";

export class PostsController {
  private createPost: CreatePost
  private likePost: LikePost
  private listPosts: ListPosts

  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {
    this.createPost = new CreatePost(this.usersRepository, this.postsRepository)
    this.likePost = new LikePost(this.usersRepository, this.postsRepository)
    this.listPosts = new ListPosts(this.postsRepository)
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

  async list(_request: FastifyRequest, _reply: FastifyReply) {
    const posts = await this.listPosts.execute()
    return posts.map(PostViewModel.toHTTP)
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