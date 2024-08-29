import { Post } from '@entities/post'
import { User } from '@entities/user'
import { PostsRepository } from '@repositories/posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.items.find((post) => post.id === id)
  }

  async list(): Promise<Post[]> {
    const posts = this.items.filter((post) => !post.parentId);
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
  }

  async listParents(id: string): Promise<Post[]> {
    const posts = this.items.filter((post) => post.parentId === id)
    return posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  async countParents(id: string): Promise<number> {
    const parents = this.items.filter((post) => post.parentId === id)
    return parents.length
  }

  async like(post: Post, user: User): Promise<void> {
    const index = this.items.indexOf(post)
    if (index !== -1) {
      this.items[index].like(user)
      user.addLikedPost(post)
    }
  }

  async dislike(post: Post, user: User): Promise<void> {
    const index = this.items.indexOf(post)
    if (index !== -1) {
      this.items[index].dislike(user.id)
      user.removeLikedPost(post)
    }
  }

  async save(post: Post): Promise<void> {
    const index = this.items.indexOf(post)
    if (index !== -1) {
      this.items[index] = post
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((post) => post.id !== id)
  }
}