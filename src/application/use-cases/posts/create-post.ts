import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { AuthorNotFound } from "./errors/AuthorNotFound";
import { Post } from "@entities/post";
import { PostNotFound } from "./errors/PostNotFound";

interface CreatePostRequest {
  text: string;
  authorId: string;
  parentId?: string;
}

export class CreatePost {
  constructor (
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    text,
    authorId,
    parentId,
  }: CreatePostRequest) {
    const author = await this.usersRepository.findById(authorId)
    if(!author) throw new AuthorNotFound();

    const parentPost = await this.postsRepository.findById(`${parentId}`)
    if(parentId && !parentPost) throw new PostNotFound();

    const post = new Post({
      text,
      authorId,
      author,
      parentId,
    })

    await this.postsRepository.create(post)

    return post
  }
}