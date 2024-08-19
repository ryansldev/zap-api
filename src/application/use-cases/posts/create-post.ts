import { PostsRepository } from "@repositories/posts-repository";
import { UsersRepository } from "@repositories/users-repository";
import { AuthorNotFound } from "./errors/AuthorNotFound";
import { Post } from "@entities/post";

interface CreatePostRequest {
  text: string;
  authorId: string;
}

export class CreatePost {
  constructor (
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    text,
    authorId,
  }: CreatePostRequest) {
    const author = await this.usersRepository.findById(authorId)
    if(!author) throw new AuthorNotFound();

    const post = new Post({
      text,
      authorId,
    })

    await this.postsRepository.create(post)

    return post
  }
}