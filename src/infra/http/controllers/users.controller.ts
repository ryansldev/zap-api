import { UsersRepository } from "@repositories/users-repository";
import { CreateUser } from "@use-cases/users/create-user";
import { FindUserByUsername } from "@use-cases/users/find-user-by-username";
import { UserViewModel } from "@view-models/user-view-model";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UsersController {
  private createUser: CreateUser
  private findUserByUsername: FindUserByUsername

  constructor(private usersRepository: UsersRepository) {
    this.createUser = new CreateUser(this.usersRepository)
    this.findUserByUsername = new FindUserByUsername(this.usersRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
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

  async findByUsername(request: FastifyRequest, reply: FastifyReply) {
    const findUserByUsernameParamsSchema = z.object({
      username: z.string()
    })

    const { username } = findUserByUsernameParamsSchema.parse(request.params)

    const user = await this.findUserByUsername.execute({
      username,
    })

    if(!user) return reply.status(404).send();

    return UserViewModel.toHTTP(user)
  }
}