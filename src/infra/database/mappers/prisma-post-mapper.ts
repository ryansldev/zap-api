import { Post } from '@entities/post';
import { Prisma, Post as RawPost } from '@prisma/client';
import { PrismaUserMapper } from './prisma-user-mapper';

type FullRawPost = Prisma.PostGetPayload<{
  include: {
    author: true,
    liked_by: true,
  }
}>

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

  static toDomain(post: FullRawPost): Post {
    return new Post({
      id: post.id,
      text: post.text,
      authorId: post.author_id,
      author: PrismaUserMapper.toDomain(post.author),
      likedBy: post.liked_by.map(PrismaUserMapper.toDomain),
      parentId: post.parent_id ?? undefined,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    })
  }
}