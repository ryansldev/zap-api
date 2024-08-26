import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Post } from './post'

describe('Post', () => {
  it('should be able to create post', async () => {
    const author = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await author.hashPassword()

    const post = new Post({
      text: 'New post',
      authorId: author.id,
      author,
    })

    expect(post).toBeInstanceOf(Post)
  })

  it('should be able to like a post', async () => {
    const author = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await author.hashPassword()

    const post = new Post({
      text: 'New post',
      authorId: author.id,
      author,
    })

    post.like(author)

    expect(post.likedBy).toEqual([author])
  })

  it('should be able to dislike a post', async () => {
    const author = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await author.hashPassword()

    const post = new Post({
      text: 'New post',
      authorId: author.id,
      author,
    })

    post.like(author)
    
    post.dislike(author.id)

    expect(post.likedBy).toEqual([])
  })
})
