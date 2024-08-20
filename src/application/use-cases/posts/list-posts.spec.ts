import { describe, expect, it } from "vitest";
import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { ListPosts } from "./list-posts";
import { CreateUser } from "@use-cases/users/create-user";
import { CreatePost } from "./create-post";

describe('List posts', () => {
  it('should be able to list posts', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()

    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const sut = new ListPosts(postsRepository)

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

    expect(sut.execute()).resolves.toEqual([post])
  })
})