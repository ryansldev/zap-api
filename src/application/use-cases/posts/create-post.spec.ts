import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { describe, expect, it } from "vitest";
import { CreatePost } from "./create-post";
import { Post } from "@entities/post";
import { AuthorNotFound } from "./errors/AuthorNotFound";

describe('Create post', () => {
  it('should be able to create a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    
    const createUser = new CreateUser(usersRepository)
    const sut = new CreatePost(usersRepository, postsRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    expect(sut.execute({
      text: 'New post',
      authorId: user.id,
    })).resolves.toBeInstanceOf(Post)
  })

  it('should not be able to create a post with a author that not exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()

    const sut = new CreatePost(usersRepository, postsRepository)

    expect(sut.execute({
      text: 'New post',
      authorId: '123',
    })).rejects.toThrow(AuthorNotFound)
  })
})