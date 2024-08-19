import { Post } from '@entities/post';
import { Post as RawPost } from '@prisma/client';

export class PrismaPostMapper {
  static toPrisma(post: Post): RawPost {
    return {
      id: post.id,
      text: post.text,
      parent_id: post.parentId ?? null,
      author_id: post.authorId,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    }
  }

  static toDomain(post: RawPost): Post {
    return new Post({
      id: post.id,
      text: post.text,
      authorId: post.author_id,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    })
  }
}