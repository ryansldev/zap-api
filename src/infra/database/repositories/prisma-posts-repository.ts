import { PrismaPostMapper } from "@prisma-mappers/prisma-post-mapper";
import { PrismaService } from "@database/prisma";
import { Post } from "@entities/post";
import { PostsRepository } from "@repositories/posts-repository";

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

  async save(post: Post): Promise<void> {
    await this.prisma.post.update({
      where: {
        id: post.id,
      },
      data: PrismaPostMapper.toPrisma(post)
    })    
  }
}