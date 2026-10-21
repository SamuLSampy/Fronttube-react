import axios from "axios"

// Se conecta com o backend para buscar vídeos
async function getVideos({ type, quant = 50, query = null, pageToken }) {
  try {
    let url = "";
    let params = {};

    switch (type) {
      case "trending":
        console.log(pageToken)
        url = "/api/get/trending";
        params = { type, quant, pageToken};
        break;

      case "shorts":
        url = "/api/get/search";
        params = { quant };
        break;

      case "search":
        url = "/api/get/search";
        params = { query, quant, pageToken };
        break;

      default:
        throw new Error(`Tipo inválido fornecido: "${type}"`);
    }

    const { data } = await axios.get(url, { params });

    if (data?.videos) {
      return data;
    }

    throw new Error("Nenhum vídeo retornado pela API.");
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    throw error;
  }
}

export default {
    getVideos
}
