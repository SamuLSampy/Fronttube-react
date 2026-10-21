import axios from 'axios';

// Busca vídeos aleatórios
const getVideos = async (API_KEY, type, quant, pageToken = null) => {
    let url;
    let response;
    try{
        switch(type){
        case "long":
        case "trending":
            url = `https://www.googleapis.com/youtube/v3/videos`

            response = await axios(url, {
                params: {
                    part: 'snippet',
                    chart: 'mostPopular',
                    regionCode: 'BR',
                    maxResults: quant,
                    key: API_KEY,
                    pageToken: pageToken,
                }
            });
            break
        case "shorts":
            // Para shorts, é necessário usar a rota de search, pois não há parametros próprios na rota 'videos' para shorts.
            url = `https://www.googleapis.com/youtube/v3/search`

            response = await axios(url, { 
                params: {
                    part: 'snippet',
                    type: 'video',
                    videoDuration: 'short',
                    q: 'shorts',
                    regionCode: 'BR',
                    order: 'viewCount',
                    maxResults: quant,
                    key: API_KEY,
                    pageToken: pageToken,
                }
            })
            break
        default:
            throw new Error(`Tipo de vídeo inválido: ${type}`)
        };
        const completeVideos = await getVideoExtras(API_KEY, response.data.items);
        return {
            videos: completeVideos,
            nextPageToken: response.data.nextPageToken
        }
    } catch(e){
        console.error('Erro na chamada da API: ', e.message)
        throw e
    }
}

// Pesquisa por lista de vídeos
const getSearch = async (API_KEY, query, quant, pageToken = null) => {
    let response
    try{
        response = await axios('https://www.googleapis.com/youtube/v3/search', {params: {
            part: 'snippet',
            type: 'video',
            q: query,
            maxResults: quant,
            key: API_KEY,
            pageToken,
        }})

        const completeVideos = await getVideoExtras(API_KEY, response.data.items);
        return {
            videos: completeVideos,
            nextPageToken: response.data.nextPageToken
        }
    } catch(e){
        console.error("Erro na requisição: ", e)
        throw e
    }
}

// Retorna informações extras que não são retornadas na API padrão de busca por vídeos
const getVideoExtras = async (API_KEY, videos) => {
    const videoIds = videos.map(v => v.id.videoId || v.id).join(',');
    const channelIds = videos.map(v => v.snippet.channelId).join(',');

    const videoDetails = await axios('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'statistics,contentDetails', id: videoIds, key: API_KEY
        }
    })

    const channelDetails = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
            part: 'snippet', id: channelIds, key: API_KEY
        }
    })

    return videos.map(video => {
        const vId = video.id.videoId || video.id;
        const vStat = videoDetails.data.items.find(v => v.id === vId);
        const cStat = channelDetails.data.items.find(c => c.id === video.snippet.channelId);

        const thumbs = video.snippet.thumbnails;
        const bestThumbnail = (thumbs.maxres || thumbs.standard || thumbs.high || thumbs.medium || thumbs.default).url

        return {
            id: vId,
            title: video.snippet.title,
            thumbnail: bestThumbnail,
            description: video.snippet.description,
            channelTitle: video.snippet.channelTitle,
            channelLogo: cStat.snippet.thumbnails.default.url,
            channelId: video.snippet.channelId,
            views: vStat.statistics.viewCount,
            duration: vStat.contentDetails.duration,
            publishedAt: video.snippet.publishedAt
        };
    })
}
    
export default {
    getVideos,
    getSearch
}