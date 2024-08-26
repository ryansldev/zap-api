import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { InMemoryPostsRepository } from "@repositories/in-memory/in-memory-posts-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { CreatePost } from "./create-post";
import { LikePost } from "./like-post";
import { Post } from "@entities/post";
import { DislikePost } from "./dislike-post";

describe('Dislike post', () => {
  it('should be able to dislike a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    const createUser = new CreateUser(usersRepository)
    const createPost = new CreatePost(usersRepository, postsRepository)
    const likePost = new LikePost(usersRepository, postsRepository)
    const sut = new DislikePost(usersRepository, postsRepository)
    
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

    await likePost.execute({
      postId: post.id,
      userId: user.id,
    })

    const result = await sut.execute({
      postId: post.id,
      userId: user.id,
    })

    expect(result).toBeInstanceOf(Post)
    expect(result.likedBy).toEqual([])
    expect(user.liked).toEqual([])
  })
})