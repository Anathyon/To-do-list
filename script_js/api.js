import { UNSPLASH_API_KEY } from "./config.js"; // Note: importa como .js após a compilação TS
const fetchunsplash = async () => {
    // 1. Acessa a variável de ambiente através da importação
    const chave_api_unsplash = UNSPLASH_API_KEY;
    if (!chave_api_unsplash || chave_api_unsplash === "SUA_CHAVE_SECRETA_DA_UNSPLASH_AQUI") {
        console.error("ERRO: A chave da Unsplash não foi configurada corretamente.");
        return 'none';
    }
    const query = [
        "dark abstract",
        "neon background",
        "minimalist workspace dark",
        "cyberpunk city",
        "geometric dark pattern",
        "deep space nebula",
        "dark tech",
        "liquid metal abstract",
        "blue purple gradient dark",
        "low light office",
        "minimalist dark wall"
    ];
    // Escolhe um termo aleatoriamente para a pesquisa
    const randomQuery = query[Math.floor(Math.random() * query.length)];
    // Filtra para fotos que fiquem melhores como fundo (orientação)
    const url = `https://api.unsplash.com/search/photos?query=${randomQuery}&client_id=${chave_api_unsplash}&orientation=landscape`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok || data.results.length === 0) {
            // Se a busca falhar ou não retornar resultados, tenta com uma query padrão
            console.warn(`Busca falhou para "${randomQuery}". Tentando termo de fallback.`);
            const fallbackUrl = `https://api.unsplash.com/search/photos?query=dark abstract&client_id=${chave_api_unsplash}&orientation=landscape`;
            const fallbackResponse = await fetch(fallbackUrl);
            const fallbackData = await fallbackResponse.json();
            if (!fallbackResponse.ok || fallbackData.results.length === 0) {
                throw new Error('Erro ao buscar imagem no Unsplash, mesmo com fallback.');
            }
            const ret_ind_random_fallback = Math.floor(Math.random() * fallbackData.results.length);
            return fallbackData.results[ret_ind_random_fallback].urls.regular;
        }
        const ret_ind_random = Math.floor(Math.random() * data.results.length);
        return data.results[ret_ind_random].urls.regular;
    }
    catch (error) {
        // Se houver qualquer erro na API, retorna um fundo escuro simples para não quebrar o layout
        console.error("Erro fatal ao carregar imagem de fundo:", error);
        return 'none'; // Retorna 'none' para que o CSS do body cuide do fundo escuro
    }
};
export const background_img_unsplash = async () => {
    try {
        const img_url = await fetchunsplash();
        if (img_url !== 'none') {
            // Aplica a imagem de fundo e garante que ela se ajuste corretamente
            document.body.style.backgroundImage = `url(${img_url})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center center';
            document.body.style.backgroundAttachment = 'fixed'; // Efeito Parallax
        }
        else {
            // Garante que o fundo escuro do CSS seja mantido
            document.body.style.backgroundImage = 'none';
        }
    }
    catch (error) {
        console.error(error);
    }
};
