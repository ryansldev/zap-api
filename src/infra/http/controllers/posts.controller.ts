import { z } from "zod";
import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { CreatePost } from "@use-cases/posts/create-post";
import { LikePost } from "@use-cases/posts/like-post";
import { ListPosts } from "@use-cases/posts/list-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { PostViewModel } from "@view-models/post-view-model";
import { ListPostParents } from "@use-cases/posts/list-post-parents";
import { FindPostById } from "@use-cases/posts/find-post-by-id";
import { DislikePost } from "@use-cases/posts/dislike-post";
import { GetPostParentsCount } from "@use-cases/posts/get-post-parents-count";

export class PostsController {
  private createPost: CreatePost
  private likePost: LikePost
  private dislikePost: DislikePost
  private listPosts: ListPosts
  private listPostParents: ListPostParents
  private countPostParents: GetPostParentsCount
  private findPostById: FindPostById

  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {
    this.createPost = new CreatePost(this.usersRepository, this.postsRepository)
    this.likePost = new LikePost(this.usersRepository, this.postsRepository)
    this.dislikePost = new DislikePost(this.usersRepository, this.postsRepository)
    this.listPosts = new ListPosts(this.postsRepository)
    this.listPostParents = new ListPostParents(this.postsRepository)
    this.findPostById = new FindPostById(this.postsRepository)
    this.countPostParents = new GetPostParentsCount(this.postsRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user

    const createPostBodySchema = z.object({
      text: z.string(),
      parentId: z.string().uuid().optional(),
    })

    const { text, parentId } = createPostBodySchema.parse(request.body)

    return await this.createPost.execute({
      text,
      authorId,
      parentId,
    })
  }

  async findById(request: FastifyRequest, _reply: FastifyReply) {
    const findPostByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = findPostByIdParamsSchema.parse(request.params)

    const post = await this.findPostById.execute({ id })

    return PostViewModel.toFullHTTP(post)
  }

  async list(request: FastifyRequest, _reply: FastifyReply) {
    const listPostsQuerySchema = z.object({
      limit: z.coerce.number().optional(),
      page: z.coerce.number().optional(),
    })

    const { limit, page } = listPostsQuerySchema.parse(request.query)

    const posts = await this.listPosts.execute({ limit, page })
    return posts.map(PostViewModel.toFullHTTP)
  }

  async listParents(request: FastifyRequest, _reply: FastifyReply) {
    const listParentsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = listParentsParamsSchema.parse(request.params)

    const posts = await this.listPostParents.execute({ id })

    return posts.map(PostViewModel.toFullHTTP)
  }

  async countParents(request: FastifyRequest, _reply: FastifyReply) {
    const countParentsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = countParentsParamsSchema.parse(request.params)

    const count = await this.countPostParents.execute({ id })

    return { count }
  }

  async like(request: FastifyRequest, _reply: FastifyReply) {
    const { id: userId } = request.user

    const likePostParamsSchema = z.object({
      id: z.string(),
    })

    const { id: postId } = likePostParamsSchema.parse(request.params)

    await this.likePost.execute({ userId, postId })
  }

  async dislike(request: FastifyRequest, _reply: FastifyReply) {
    const { id: userId } = request.user

    const dislikePostParamsSchema = z.object({
      id: z.string(),
    })

    const { id: postId } = dislikePostParamsSchema.parse(request.params)

    await this.dislikePost.execute({ userId, postId })
  }
}