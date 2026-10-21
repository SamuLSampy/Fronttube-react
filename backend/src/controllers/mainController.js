import 'dotenv/config';
import videoServices from '../services/videoServices.js'; // <- não esqueça do .js no final

const API_KEY = process.env.SECRET_API_KEY;

const getTrending = async (request, reply) => {
    try {
        const config = request.query;
        const data = await videoServices.getVideos(API_KEY, config.type, config.quant, config.pageToken);
        return data;
    } catch(e) {
        reply.code(500).send({ error: "Cannot communicate with Youtube." });
        console.log(e)
    }
}

const getSearch = async (request, reply) => {
    try {
        const config = request.query;
        const data = await videoServices.getSearch(API_KEY, config.query, config.quant, config.pageToken);
        return data;
    } catch(e) {
        reply.code(500).send({ error: "Cannot communicate with Youtube." });
    }
}

const ping = async(request, reply) => {
    reply.code(200).send({status: "ok"})
}

export default {
    getTrending,
    getSearch,
    ping
}