
import { FastifyInstance } from "fastify";
import { PrismaService } from "@database/prisma";

const prisma = new PrismaService()

import { PrismaUsersRepository } from "@prisma-repositories/prisma-users-repository";
// import { PrismaPostsRepository } from "@prisma-repositories/prisma-posts-repository";

import { UsersController } from "@controllers/users.controller"
import { PrismaPostsRepository } from "@prisma-repositories/prisma-posts-repository";
import { PostsController } from "@controllers/posts.controller";

const usersRepository = new PrismaUsersRepository(prisma)
const usersController = new UsersController(usersRepository)

const postsRepository = new PrismaPostsRepository(prisma)
const postsController = new PostsController(usersRepository, postsRepository)

async function routes (app: FastifyInstance) {
  // USER
  app.post('/signup', (request, reply) => usersController.create(request, reply))
  app.post('/login', (request, reply) => usersController.auth(request, reply))
  app.delete('/logout', (request, reply) => usersController.logout(request, reply))
  app.get('/users/:username', {
    preHandler: [app.authenticate]
  }, (request, reply) => usersController.findByUsername(request, reply))

  // POST
  app.post('/posts', {
    preHandler: [app.authenticate]
  }, (request, reply) => postsController.create(request, reply))
  app.post('/posts/:id/like', {
    preHandler: [app.authenticate]
  }, (request, reply) => postsController.like(request, reply))
  app.post('/posts/:id/dislike', {
    preHandler: [app.authenticate]
  }, (request, reply) => postsController.dislike(request, reply))
  app.get('/posts', (request, reply) => postsController.list(request, reply))
  app.get('/posts/:id', (request, reply) => postsController.findById(request, reply))
  app.get('/posts/:id/comments', (request, reply) => postsController.listParents(request, reply))
  app.get('/posts/:id/comments/count', (request, reply) => postsController.countParents(request, reply))
}

export default routes
