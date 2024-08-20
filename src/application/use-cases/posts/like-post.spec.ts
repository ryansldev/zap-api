import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { CreatePost } from "./create-post";
import { LikePost } from "./like-post";
import { Post } from "@entities/post";

describe('Like post', () => {
  it('should be able to like a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const sut = new LikePost(usersRepository, postsRepository)
    
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
      postId: post.id,
      userId: user.id,
    })

    expect(result).toBeInstanceOf(Post)
    expect(result.likedBy).toEqual([user])
    expect(user.liked).toEqual([post])
  })
})