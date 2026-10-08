import apiConnect from './api'

// Armazena vídeos para evitar novas requisições
let bufferList ={
    trending: [],
    shorts: [],
    search: []
}

// Token utilizado pela API do youtube para evitar retorno de vídeos repetidos
let nextToken ={
    trending: null,
    shorts: null,
    search: null
}

// Retorna vídeos armazenados
async function getStoredVideos(type, quant = 12){
    if(!bufferList[type]) throw new Error(`Typo específicado inválido: ${type}`)
    let storedVideos = bufferList[type];

    if(storedVideos.length < quant){
        try{
            await refillBuffer(type)
        } catch(e){
            console.error("Falha ao alimentar Buffer de vídeos: " + e)
        }
    }

    if(quant >= 0){
        return storedVideos.splice(0, quant)
    } else {
        return storedVideos.splice(0)
    }
}

async function refillBuffer(type) {
    if(!bufferList[type]) throw new Error(`Tipo específicado inválido: ${type}`)

    let currentPageToken = nextToken[type];
    let storedVideos = bufferList[type];

    try{
        const results = await apiConnect.getVideos({type, quant: 50, PageToken: currentPageToken})
        if(results.videos){
            nextToken[type] = results.nextPageToken
            storedVideos.push(...results.videos)
        }
    } catch(e){
        console.error("Falha ao retornar vídeos: " + e)
    } 
}

export default{
    getStoredVideos,
    refillBuffer
}
