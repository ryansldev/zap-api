import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { describe, expect, it } from "vitest";
import { CreatePost } from "./create-post";
import { DeletePost } from "./delete-post";
import { Post } from "@entities/post";
import { UserNotAuthorized } from "./errors/UserNotAuthorized";
import { FindPostById } from "./find-post-by-id";
import { PostNotFound } from "./errors/PostNotFound";

describe('Delete post', () => {
  it('should be able to delete a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    
    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const sut = new DeletePost(postsRepository)
    const findPostById = new FindPostById(postsRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    const post = await createPost.execute({
      text: 'New post',
      authorId: user.id,
    })

    const result = await sut.execute({
      id: post.id,
      authorId: user.id,
    })

    expect(result).toBeInstanceOf(Post)

    expect(findPostById.execute({
      id: post.id
    })).rejects.toThrowError(PostNotFound)
  })

  it('should not be able to delete a post from other user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    
    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const sut = new DeletePost(postsRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    const user2 = await createUser.execute({
      name: 'John',
      lastname: 'Doe 2',
      email: 'johndoe2@gmail.com',
      username: 'johndoe2',
      password: 'johndoe123',
      location: 'BR',
    })

    const post = await createPost.execute({
      text: 'New post',
      authorId: user2.id,
    })

    expect(sut.execute({
      id: post.id,
      authorId: user.id,
    })).rejects.toThrowError(UserNotAuthorized)
  })
})