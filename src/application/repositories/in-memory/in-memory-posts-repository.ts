import { Post } from '@entities/post'
import { PostsRepository } from '@repositories/posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.items.find((post) => post.id === id)
  }

  async save(post: Post): Promise<void> {
    const index = this.items.indexOf(post)
    if (index !== -1) {
      this.items[index] = post
    }
  }
}