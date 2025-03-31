const fetchunsplash = async (): Promise<string> => {
    const chave_api_unsplash:string = "TPEbPt9EMbLvZEXMUqYhNiCVtugoti_-B_-Fi_S1VC0" 
    const query:string[] = ["mar","natureza","oceano","praia","animais","flores","florestas","paisagens","dunas","beleza","cidades","montanhas","dia","noite"]
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${chave_api_unsplash}`

    const response = await fetch(url)
    const data = await response.json()
   
    if (!response.ok || data.results.length === 0) { 
        throw new Error('Erro ao buscar imagem no Unsplash')
    }

    const ret_ind_random = Math.floor(Math.random()*data.results.length)
    return data.results[ret_ind_random].urls.regular
}

export const background_img_unsplash = async () => {
    try {
       const img_url = await fetchunsplash()
       document.body.style.backgroundImage = `url(${img_url})`
    } catch (error) {
        console.error(error)
    }
}








