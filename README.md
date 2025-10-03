# 📝 To-Do List Premium

Este é um projeto moderno e funcional de **Lista de Tarefas (To-Do List)**, desenvolvido com **TypeScript, HTML5 e CSS3**.  
Com um design exclusivo no estilo **Neon Glassmorphism**, ele oferece uma experiência visual elegante e responsiva para gerenciar suas tarefas do dia a dia.

O projeto conta com **persistência de dados no localStorage** e suporte a **Progressive Web App (PWA)**, garantindo uma experiência semelhante a aplicativos nativos, com instalação e funcionamento offline.

---

## ✨ Destaques do Projeto

- 🎨 **Design Premium:** Estilo moderno com Glassmorphism e detalhes em Neon Gradient (verde e ciano).  
- 📲 **PWA (Progressive Web App):** Instalável, funciona offline e carrega instantaneamente.  
- 📊 **Painel de Estatísticas:** Exibe tarefas criadas, concluídas e próximas (24h).  
- 🛠️ **Controle Completo:** CRUD (Criar, Ler, Atualizar e Deletar) de tarefas.  
- 🔍 **Filtros Inteligentes:** Filtragem por status (Ativas/Concluídas) e pesquisa por título.  
- 📱 **Totalmente Responsivo:** Layout otimizado para Desktop, Tablet (colunas) e Mobile.  

---

## 📌 Funcionalidades

- ✅ **Adicionar/Cadastrar:** Criação de novas tarefas com título, data e hora.  
- ✅ **Exibir/Gerenciar:** Lista de tarefas salvas e organizadas.  
- ✅ **Edição Completa:** Alteração de título, data e hora através de modais.  
- ✅ **Conclusão:** Marcar e desmarcar tarefas como concluídas.  
- ✅ **Remoção:** Exclusão individual de tarefas.  
- ✅ **Persistência de Dados:** Uso de `localStorage` para salvar todas as tarefas no navegador.  

---

## 🧪 Tecnologias Utilizadas

| Ferramenta       | Descrição |
|------------------|------------|
| **TypeScript**   | Tipagem estática robusta, compilado para JavaScript (ES6+). |
| **HTML5**        | Estruturação semântica da página. |
| **CSS3**         | Estilização avançada com Glassmorphism, gradientes, efeitos neon e Media Queries. |
| **PWA**          | Service Worker e Web Manifest para offline e instalação nativa. |
| **Bootstrap Icons** | Ícones modernos para botões e status (via npm). |

---

## 🖼️ Layout

Visualização do **Dashboard** em diferentes dispositivos:

### 💻 Desktop  
<div align="center">  
  <img src="https://github.com/Anathyon/To-do-list/blob/main/assets/todo-desktop.png" width="400" alt="Versão Desktop" />  
</div>  

### 📱 Mobile  
<div align="center">  
  <img src="https://github.com/Anathyon/To-do-list/blob/main/assets/todo-mobile.jpg" width="200" alt="Versão Mobile" />  
</div>  

---

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2️⃣ Instalar Dependências e Compilar (Node.js)
```bash
# Instale as dependências
npm install

# Compile o TypeScript para JavaScript (saída em script_js/)
npx tsc
```

### 3️⃣ Executar Localmente (Obrigatório para PWA)
Para testar a funcionalidade de **PWA/Service Worker**, é necessário rodar o projeto em um servidor **http://** (não `file://`).

Opções recomendadas:
- Extensão **Live Server** (VS Code).  
- Servidor simples com Node.js:  
```bash
npx http-server
```

---

## 🔄 Melhorias Futuras

- 🔔 Implementar **notificações push** para tarefas agendadas (via PWA).  
- 📅 Adicionar **ordenação por data ou status**.  
- ⛔ Criar **validação robusta** para impedir datas passadas.  

---

## 🤝 Contribuições

Contribuições são muito bem-vindas!  
Se tiver ideias de melhorias, encontrar bugs ou quiser sugerir novas funcionalidades, abra uma **issue** ou envie um **pull request**.

---

## 🧑‍💻 Autor

👨‍💻 Desenvolvido por: **Anathyon Erysson**  
🔗 [LinkedIn](https://www.linkedin.com/in/anathyonerysson/)  
📧 **anathyon@protonmail.com**

