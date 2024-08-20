import { z } from "zod";
import { UsersRepository } from "@repositories/users-repository";
import { AuthUser } from "@use-cases/users/auth-user";
import { CreateUser } from "@use-cases/users/create-user";
import { FindUserByUsername } from "@use-cases/users/find-user-by-username";
import { UserViewModel } from "@view-models/user-view-model";
import { FastifyReply, FastifyRequest } from "fastify";

export class UsersController {
  private createUser: CreateUser
  private findUserByUsername: FindUserByUsername
  private authUser: AuthUser

  constructor(private usersRepository: UsersRepository) {
    this.createUser = new CreateUser(this.usersRepository)
    this.findUserByUsername = new FindUserByUsername(this.usersRepository)
    this.authUser = new AuthUser(this.usersRepository)
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

  async auth(request: FastifyRequest, reply: FastifyReply) {
    const authUserBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = authUserBodySchema.parse(request.body)

    const { id } = await this.authUser.execute({ username, password })

    const token = request.jwt.sign({ id })

    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    })

    return { token }
  }

  async findByUsername(request: FastifyRequest, _reply: FastifyReply) {
    const findUserByUsernameParamsSchema = z.object({
      username: z.string()
    })

    const { username } = findUserByUsernameParamsSchema.parse(request.params)

    const user = await this.findUserByUsername.execute({
      username,
    })

    return UserViewModel.toHTTP(user)
  }
}