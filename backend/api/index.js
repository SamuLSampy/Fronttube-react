import Fastify from 'fastify';
import routes from '../src/routes/routes.js'

const fastify = Fastify({
    logger: true
})

fastify.register(routes)

export default async function handler(req, res){
    await fastify.ready();

    fastify.server.emit('request', req, res)
}