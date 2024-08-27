import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { describe, expect, it } from "vitest";
import { CreatePost } from "./create-post";
import { GetParentsCount } from "./get-parents-count";

describe('Get parents count', () => {
  it('should be able to get parents count', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()

    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const sut = new GetParentsCount(postsRepository)

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

    await createPost.execute({
      text: 'Parent',
      authorId: user.id,
      parentId: post.id,
    })

    expect(sut.execute({ id: post.id })).resolves.toEqual(1)
  })
})
