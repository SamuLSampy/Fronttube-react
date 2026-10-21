import controllers from '../controllers/mainController.js'

export default async function youtubeRoutes(fastify, options){
    fastify.get("/api/get/trending", controllers.getTrending)
    fastify.get("/api/get/search", controllers.getSearch)
    fastify.get("/api/ping", controllers.ping)
}