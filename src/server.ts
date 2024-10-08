import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'

import routes from './routes'

import jwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { AuthenticateDecorator } from '@decorators/authenticate'

const app = Fastify()

app.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
})

const secret = process.env.JWT_SECRET!

app.register(jwt, {
  secret
})

app.addHook('preHandler', (request, _, next) => {
  request.jwt = app.jwt
  return next()
})

app.register(fastifyCookie, {
  secret,
  hook: 'preHandler'
})

app.decorate(
  'authenticate',
  AuthenticateDecorator,
)

app.register(routes)

const port = Number(process.env.PORT)
app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if(err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${address}`)
})
