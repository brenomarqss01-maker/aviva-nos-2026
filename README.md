# Acampamento Aviva-Nos 2026 — JUBRAC

Site oficial de inscrição para o Acampamento Aviva-Nos 2026. A aplicação possui um formulário responsivo em cinco etapas e conclui o fluxo preparando uma mensagem para confirmação pelo WhatsApp da equipe JUBRAC.

## Tecnologias

- React 19
- TypeScript
- Vite
- CSS responsivo e mobile-first
- Vitest

## Executando localmente

Requer Node.js 20.19 ou superior.

```bash
npm install
npm run dev
```

O endereço local será exibido pelo Vite, normalmente `http://localhost:5173`.

## Comandos

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # prévia do build
npm test         # testes automatizados
```

## Deploy na Vercel

O projeto já inclui `vercel.json` e pode ser importado diretamente pela Vercel:

1. Acesse o painel da Vercel e escolha **Add New → Project**.
2. Importe este repositório do GitHub.
3. Mantenha o framework como **Vite**.
4. Publique o projeto.

O comando de build é `npm run build` e o diretório de saída é `dist`.

## Configuração

As informações do evento e o contato do WhatsApp ficam em:

- `src/config/eventConfig.ts`
- `src/config/shirtConfig.ts`

As imagens oficiais ficam em `public/assets`. Os caminhos estão centralizados nos arquivos de configuração para permitir substituições futuras sem alterar o formulário.

## Privacidade

Os dados preenchidos permanecem somente no estado da página. Não há banco de dados, analytics ou envio silencioso. Ao finalizar, a aplicação abre o WhatsApp com uma mensagem pré-preenchida e o participante confirma manualmente o envio.
