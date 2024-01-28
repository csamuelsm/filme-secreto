# Filme Secreto

Filme Secreto é um jogo diário em que o objetivo é descobrir o filme secreto do dia. Para fazer isso, você deve chutar filmes que você acha que podem ser similares ao filme secreto. Você pode chutar quantas vezes quiser. Um algoritmo de aprendizado de máquina avalia a semelhança entre o filme chutado e o filme secreto, treinado com base em tags atribuídas por usuários a filmes.

**Para jogar Filme Secreto, [clique aqui](https://www.filme-secreto.com.br/).**

## Rodando localmente

### Pre-requisites

1. [Node.js](https://nodejs.org/en/) or nvm installed.
2. `pnpm` installed.

### Getting Started

1. You can either click `Use this template` button on this repository and clone the repo or directly from your terminal:

```bash
npx degit sozonome/nextarter-chakra <YOUR_APP_NAME>
```

2. After cloning the project, run this command: `pnpm` or `pnpm install`

3. Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/lib/pages/index.tsx`. The page auto-updates as you edit the file.

### How to Run e2e Test (in local machine)

1. Build production with `pnpm build`, then run the production build using `pnpm start`.
2. Open another terminal (or new terminal tab, don't cancel / close the production server), then run the test with `pnpm test:e2e`.

## Agradecimentos

Filme Secreto foi desenvolvido a partir do [template de Next.js + Chakra UI do sznm](https://nextarter-chakra.sznm.dev/). A mecânica do jogo foi inspirada no [Contexto.me](https://contexto.me/). O algoritmo utilizado para obter as embeddings dos filmes é Doc2Vec treinado por mim utilizando os datasets públicos do MovieLens 25m e IMDb. O jogo está hospedado na Vercel.
