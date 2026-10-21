import apiConnect from './api'

let loading = false

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

// Impede de mais vídeos serem buscados se já estiverem no fim da lista
let hasMore = {
    trending: true,
    shorts: true,
    search: true
}

// Retorna vídeos armazenados
async function getStoredVideos(type, quant = 12){
    if(!bufferList[type]) throw new Error(`Tipo específicado inválido: ${type}`)
    if(loading) return []
    if(!hasMore[type]) return {endList: true}

    loading = true
    let storedVideos = bufferList[type];

    if(storedVideos.length < quant){
        try{
            await refillBuffer(type)
        } catch(e){
            throw e
        }
    }
    loading = false
    
    if(quant >= 0){
        return storedVideos.splice(0, quant)
    } else {
        return storedVideos.splice(0)
    }
}

// Busca por mais vídeos pela API
async function refillBuffer(type) {
    if(!bufferList[type]) throw new Error(`Tipo específicado inválido: ${type}`)
    let currentPageToken = nextToken[type];
    let storedVideos = bufferList[type];

    console.log(currentPageToken)

    try{
        const results = await apiConnect.getVideos({type, quant: 50, pageToken: currentPageToken})
        if(results.videos){
            console.log("Token Retornado:" + results.nextPageToken)
            nextToken[type] = results.nextPageToken
            storedVideos.push(...results.videos)
        }
        if (!results.nextPageToken && hasMore[type]){
            hasMore[type] = false;
            throw new Error("nextPageToken retornou vazia. Vídeos chegaram ao fim.")
        }
    } catch(e){
        throw e
    } 
}

export default{
    getStoredVideos,
    refillBuffer
}
