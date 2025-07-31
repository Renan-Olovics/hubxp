# 📰 HubXP - Buscador de Notícias

Um aplicativo moderno de busca de notícias construído com Next.js, React e TypeScript. Permite buscar notícias de diferentes fontes, salvar favoritos e filtrar resultados por diversos critérios.

## ✨ Funcionalidades

- 🔍 **Busca de Notícias**: Busca notícias de múltiplas fontes
- ❤️ **Sistema de Favoritos**: Salve e gerencie suas notícias favoritas
- 🎯 **Filtros Avançados**: Filtre por data, fonte, idioma e mais
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile
- ⚡ **Infinite Scroll**: Carregamento automático de mais notícias
- 🎨 **UI Moderna**: Interface elegante com Tailwind CSS
- 🔄 **Estado Persistente**: Favoritos salvos localmente

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15.4.5
- **Frontend**: React 19.1.0
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Gerenciamento de Estado**: React Query (TanStack Query)
- **Formulários**: React Hook Form
- **Utilitários**: Tailwind Merge, Tailwind Variants
- **API de Notícias**: [NewsAPI](https://newsapi.org/docs/endpoints/everything) - Mais de 150.000 fontes de notícias

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm**, **yarn**, **pnpm** ou **bun** (gerenciador de pacotes)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd hubxp
```

### 2. Instale as dependências

```bash
# Usando npm
npm install

# Usando yarn
yarn install

# Usando pnpm
pnpm install

# Usando bun
bun install
```

### 3. Execute o servidor de desenvolvimento

```bash
# Usando npm
npm run dev

# Usando yarn
yarn dev

# Usando pnpm
pnpm dev

# Usando bun
bun dev
```

### 4. Acesse a aplicação

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── atoms/            # Componentes atômicos
│   └── pages/            # Componentes de página
├── contexts/             # Contextos React
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── services/             # Serviços e APIs
└── types/                # Definições de tipos TypeScript
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🔧 Configuração

### Variáveis de Ambiente

**⚠️ IMPORTANTE**: Este projeto utiliza a [NewsAPI](https://newsapi.org/docs/endpoints/everything) para buscar notícias. Você precisa obter uma API key gratuita para que o projeto funcione.

#### 1. Obtenha sua API Key

1. Acesse [https://newsapi.org](https://newsapi.org)
2. Clique em "Get API key" no menu superior
3. Faça o cadastro gratuito
4. Copie sua API key

#### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# API Key do NewsAPI (OBRIGATÓRIO)
NEWSAPI_KEY=sua_api_key_aqui

```

#### 3. Limitações da API gratuita

- **100 requests por dia** (suficiente para desenvolvimento)
- **Acesso a todos os endpoints** (Everything, Top Headlines, Sources)
- **Dados em tempo real** de mais de 150.000 fontes

### Configurações do ESLint e Prettier

O projeto já vem configurado com:

- **ESLint**: Para linting de código
- **Prettier**: Para formatação automática
- **TypeScript**: Para tipagem estática

## 🎨 Personalização

### Estilos

Os estilos são gerenciados com Tailwind CSS. Para personalizar:

1. Edite `src/app/globals.css` para estilos globais
2. Use classes Tailwind nos componentes
3. Configure o tema no arquivo de configuração do Tailwind

### Componentes

Os componentes estão organizados em:

- **Atoms**: Componentes básicos reutilizáveis
- **Pages**: Componentes específicos de página

## 🔌 Sobre a NewsAPI

Este projeto utiliza a [NewsAPI](https://newsapi.org/docs/endpoints/everything) para buscar notícias em tempo real de mais de 150.000 fontes de notícias e blogs.

### Funcionalidades da API

- **Busca Avançada**: Suporte a operadores booleanos (AND, OR, NOT)
- **Filtros por Data**: Busque notícias de períodos específicos
- **Filtros por Idioma**: Suporte a 14 idiomas diferentes
- **Ordenação**: Por relevância, popularidade ou data de publicação
- **Filtros por Domínio**: Busque em fontes específicas
- **Paginação**: Até 100 resultados por página

### Endpoints Utilizados

- **`/v2/everything`**: Busca completa em todas as fontes

### Exemplo de Uso

```javascript
// Busca por "tecnologia" nos últimos 7 dias
GET https://newsapi.org/v2/everything?q=tecnologia&from=2024-01-01&sortBy=publishedAt&apiKey=YOUR_API_KEY
```

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Certifique-se de estar usando a versão correta do Node.js
3. **Verifique se a API key está configurada corretamente**
4. Limpe o cache: `rm -rf .next node_modules && npm install`
5. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando Next.js e React**
