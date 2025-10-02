// Nome do cache (versão 1)
const CACHE_NAME = 'todo-neon-cache-v1';

// Lista de arquivos essenciais para o funcionamento offline
const urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/script_js/index.js',
    '/icon/ic.svg',
    // Adicione URLs de todos os ícones PNG listados no manifest.json
    '/icon/ic_512x512.png' 
    // ... e todos os outros
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    // Aguarda a promessa para garantir que o service worker não seja instalado até que o cache seja concluído
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto: Arquivos essenciais pré-armazenados');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Falha ao adicionar ao cache:', error);
            })
    );
});

// Busca (Estratégia Cache, then Network)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o recurso do cache se estiver lá
                if (response) {
                    return response;
                }
                // Se não estiver no cache, busca na rede
                return fetch(event.request);
            })
    );
});

// Ativação e Limpeza de Caches Antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    // Deleta todos os caches que não estão na lista branca (para atualizar a versão)
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});