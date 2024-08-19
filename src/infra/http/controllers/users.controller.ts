import { UsersRepository } from "@repositories/users-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UsersController {
  private createUser: CreateUser

  constructor(private usersRepository: UsersRepository) {
    this.createUser = new CreateUser(this.usersRepository)
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      username: z.string(),
      password: z.string(),
      location: z.string().default('BR'),
      profilePic: z.string().url().optional(),
    })

    const {
      name,
      lastname,
      email,
      username,
      password,
      location,
      profilePic,
    } = createUserBodySchema.parse(request.body)
    
    await this.createUser.execute({
      name,
      lastname,
      email,
      username,
      password,
      location,
      profilePic,
    })
  }
}