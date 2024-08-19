import 'dotenv/config'
import Fastify from 'fastify'

const app = Fastify()

app.get('/', () => {
  return { hello: 'world' }
})

const port = Number(process.env.PORT)
app.listen({ port }, (err, address) => {
  if(err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${address}`)
})
