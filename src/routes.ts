
import { FastifyInstance } from "fastify";
import { PrismaService } from "@database/prisma";

const prisma = new PrismaService()

import { PrismaUsersRepository } from "@prisma-repositories/prisma-users-repository";
// import { PrismaPostsRepository } from "@prisma-repositories/prisma-posts-repository";

import { UsersController } from "@controllers/users.controller"

const usersRepository = new PrismaUsersRepository(prisma)
const usersController = new UsersController(usersRepository)

async function routes (app: FastifyInstance) {
  app.post('/signup', (request, reply) => usersController.create(request, reply))
  app.post('/login', (request, reply) => usersController.auth(request, reply))
  app.get('/users/:username', {
    preHandler: [app.authenticate]
  }, (request, reply) => usersController.findByUsername(request, reply))
}

export default routes
