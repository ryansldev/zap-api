import { UsersRepository } from "@repositories/users-repository";
import { PrismaService } from "@database/prisma";
import { User } from "@entities/user";
import { PrismaUserMapper } from "@prisma-mappers/prisma-user-mapper";

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user)
    })
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      }
    })

    if(!user) return;

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      }
    })

    if(!user) return;

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: PrismaUserMapper.toPrisma(user)
    })
  }
}