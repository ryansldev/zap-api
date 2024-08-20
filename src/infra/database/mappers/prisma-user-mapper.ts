import { User } from "@entities/user";
import { Prisma, User as RawUser } from "@prisma/client"

type CompleteRawUser = Prisma.UserGetPayload<{
  include: {
    posted: true,
    liked: true,
  }
}>

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      location: user.location,
      password: user.password,
      profile_pic: user.profilePic ?? null,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }
  }

  static toDomain(user: RawUser): User {
    return new User({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
      location: user.location,
      createdAt: user.created_at,
      profilePic: user.profile_pic ?? undefined,
      updatedAt: user.updated_at,
    })
  }
}