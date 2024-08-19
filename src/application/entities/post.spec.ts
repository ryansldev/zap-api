import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Post } from './post'

describe('Post', () => {
  it('should be able to create post', async () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await user.hashPassword()

    const post = new Post({
      text: 'New post',
      authorId: user.id,
      author: user,
    })

    expect(post).toBeInstanceOf(Post)
    expect(post.author).toBe(user)
    expect(post.author.id).toBe(user.id)
  })

  it('should be able to like a post', async () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await user.hashPassword()

    const post = new Post({
      text: 'New post',
      authorId: user.id,
      author: user,
    })

    post.like(user)

    expect(post.likedBy).toEqual([user])
  })
})
