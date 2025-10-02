// generate-config.js
import('dotenv').then(dotenv => {
    dotenv.config();

    const fs = require('fs');

    // Chave que queremos do .env
    const apiKey = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!apiKey) {
        console.error("\n❌ ERRO: Variável UNSPLASH_ACCESS_KEY não encontrada no .env!");
        console.error("Verifique se o arquivo .env existe e se a variável está definida.\n");
        process.exit(1);
    }

    // Conteúdo do arquivo de configuração TypeScript (config.ts)
    const content = `// Este arquivo é gerado automaticamente pelo script generate-config.js
// NUNCA edite este arquivo manualmente.
export const UNSPLASH_API_KEY: string = "${apiKey}";
`;

    // Nome do arquivo de saída
    const outputDir = 'script_ts'; 
    const outputPath = `${outputDir}/config.ts`; 
    
    // Garante que o diretório exista
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }

    // Escreve o arquivo
    fs.writeFileSync(outputPath, content);
    console.log(`\n✅ Arquivo de configuração criado com sucesso: ${outputPath}\n`);

}).catch(err => {
    console.error("Erro ao importar dotenv:", err);
});

// A importação dinâmica acima foi usada para compatibilidade com ES Modules.
// Se isso causar problemas, você pode usar a sintaxe CommonJS:
// const dotenv = require('dotenv');
// dotenv.config();
// ... o restante do código que usa process.env