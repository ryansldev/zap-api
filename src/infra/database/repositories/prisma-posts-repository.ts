import { PrismaPostMapper } from "@prisma-mappers/prisma-post-mapper";
import { PrismaService } from "@database/prisma";
import { Post } from "@entities/post";
import { PostsRepository } from "@repositories/posts-repository";
import { User } from "@entities/user";
import { PrismaUserMapper } from "@database/mappers/prisma-user-mapper";

export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: Post): Promise<void> {
    await this.prisma.post.create({
      data: PrismaPostMapper.toPrisma(post)
    })
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        liked_by: true,
      }
    })

    if(!post) return;

    return PrismaPostMapper.toDomain(post)
  }

  async list(page: number, limit: number, authorId?: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        parent_id: null,
        author_id: authorId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        author: true,
        liked_by: true,
      },
      skip: (page-1)*limit,
      take: limit,
    })

    return posts.map(PrismaPostMapper.toDomain)
  }

  async listParents(id: string, page: number, limit: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        parent_id: id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        author: true,
        liked_by: true,
      },
      skip: (page-1)*limit,
      take: limit,
    })

    return posts.map(PrismaPostMapper.toDomain)
  }

  async countParents(id: string): Promise<number> {
    return this.prisma.post.count({
      where: {
        parent_id: id,
      }
    })
  }

  async like(post: Post, user: User): Promise<void> {
    const data = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        liked: true,
      }
    })
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        liked: {
          set: !data ? PrismaPostMapper.toPrisma(post) : [...data.liked, PrismaPostMapper.toPrisma(post)]
        }
      }
    })
  }

  async dislike(post: Post, user: User): Promise<void> {
    const data = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        liked: true,
      }
    })
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        liked: {
          set: data?.liked.filter((item) => item.id !== post.id)
        }
      }
    })
  }

  async save(post: Post): Promise<void> {
    await this.prisma.post.update({
      where: {
        id: post.id,
      },
      data: PrismaPostMapper.toPrisma(post)
    })    
  }
}