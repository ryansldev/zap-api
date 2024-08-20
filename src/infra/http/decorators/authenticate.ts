import { HttpStatusCode } from "@@types/enums/http-status-code";
import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export function AuthenticateDecorator(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies.access_token

  if(!token) {
    return reply.status(HttpStatusCode.FORBIDDEN).send({ message: 'Authentication required' })
  }

  const decoded = request.jwt.verify<FastifyJWT['user']>(token)
  request.user = decoded
}